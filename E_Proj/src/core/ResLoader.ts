/**
 * 资源加载类，按场景需求，分组加载资源。
 * 内部依赖于Setting，BxGloble的数据,需要ProgressBar做显示，ProgressBar在这里应该有一个实体。
 */
class ResLoader extends egret.EventDispatcher{
	/** 是否可以显示进度条*/
    private isProgressBar:boolean = false;
    /** 当前正在加载的资源组名 */
    private curGroupName:string;
    /** 是否要加载美术与策划配置文件 */
    private isArtAndPlan:Boolean;
    /** 存储已经加载过的资源组名 */
    private groupNames:string[];
    /** 加载资源配置文件 */
    private tipTf:egret.TextField;
	
    /** isArtAndPlan 是否要加载美术与策划配置文件 */
	public constructor(isArtAndPlan:Boolean=false) {
        super();
        this.isArtAndPlan = isArtAndPlan;
        this.groupNames = [];

        //注入自定义的素材解析器
        //let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        //创建提示文本
        this.tipTf = new egret.TextField();
        this.tipTf.size = 40;
        //Setting.stage.addChild(this.tipTf);
        this.loadConfig();
	}

    /** 加载资源配置文件 */
    private loadConfig(): void {
        this.setTip("加载资源配置文件...");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(e: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        this.setTip("加载主体配置文件...");
        let theme = new eui.Theme("resource/assets/default.thm.json", );
        theme.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

      private onThemeLoadComplete():void{
         if(this.isArtAndPlan){
             this.loadArtAndPlan();
         }else{
            /** 加载预加载资源文件 */
            this.loadGroup(ResType.PRE_LOAD);
         }
     }

     /** 加载并解析美术配置文件(art.json)与策划配置文件(plan.json) */
     private loadArtAndPlan():void{
         this.setTip("加载美术资源配置文件...");
         var ld:egret.URLLoader = new egret.URLLoader();
         ld.once(egret.Event.COMPLETE, this.artLoadedHandler, this);
         ld.load(new egret.URLRequest("resource/config/art.json"));
     }
     private artLoadedHandler(e:egret.Event):void{
         var str:string = e.target.data;
         this.setTip("加载策划资源配置文件...");
         var ld:egret.URLLoader = new egret.URLLoader();
         ld.addEventListener(egret.Event.COMPLETE, this.planLoadedHandler, this);
         ld.load(new egret.URLRequest("resource/config/plan.json"));
     }
     private planLoadedHandler(e:egret.Event):void{
         var str:string = e.target.data;
         str = str.replace(/(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g , "");
         try{
        //    Setting.planConfig = JSON.parse(str);
         }catch(err){
        //     Alert.show("策划配置文件(plan.json)解析出错！");
         }

        /** 加载默认的eui样式资源文件 */
        this.setTip("加载默认的eui样式资源文件...");
        this.once("sys", this.sysResLoadedHandler, this);
        this.loadGroup("sys");
     }

     private sysResLoadedHandler(e:egret.Event):void{
         /** 加载预加载资源文件 */
         this.loadGroup(ResType.PRE_LOAD);
     }

      /** 加载一组资源文件。
       * groupName 资源组的名称。
       * backcallFun 加载完成完执行的回调函数。
       * mThis 回调函数执行的对象。*/
      public loadGroup(groupName:string):void{
        if(this.isLoaded(groupName)){
            //if(this.isProgressBar) ProgressBar.hide();
            this.dispatchEvent(new egret.Event(this.curGroupName));
            return;
        }
        //Setting.status = ResType.getDesc(groupName);
        this.curGroupName = groupName;
        if(groupName == "sys"){
        }else if(this.isProgressBar){
             //ProgressBar.show();
        }else{
            let items:RES.ResourceItem[] = RES.getGroupByName(ResType.PRE_LOAD);
            this.setTip("加载必须的资源组：0/"+items.length);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(groupName);
	 }

	 private onResourceLoadComplete(e:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //Setting.status = "";
        this.groupNames.push(this.curGroupName);
        if(e.groupName == ResType.PRE_LOAD && this.isProgressBar==false){
            BxGlobal.gStage.removeChild(this.tipTf);
            this.tipTf = null;
            this.isProgressBar = true; 
        } 
        //if(this.isProgressBar) ProgressBar.hide();
        this.dispatchEvent(new egret.Event(this.curGroupName));
    }

    /** 资源组加载出错 */
    private onItemLoadError(e:RES.ResourceEvent):void{
        //console.warn("Url:" + e.resItem.url + " has failed to load");
        //Alert.show("“"+Setting.status+"”资源组加载失败！");
    }

    /** 资源组加载出错 */
    private onResourceLoadError(e:RES.ResourceEvent):void{
        //TODO
        //console.warn("Group:" + e.groupName + " has failed to load");
        //忽略加载失败的项目
        //this.onResourceLoadComplete(e);
        //Alert.show("“"+Setting.status+"”资源组加载失败！");
    }

    /** preload资源组加载进度 */
    private onResourceProgress(e:RES.ResourceEvent):void{
        if(e.groupName == "sys"){
            this.setTip("加载默认的eui样式资源文件："+e.itemsLoaded+"/"+e.itemsTotal);
        }else if(e.groupName == ResType.PRE_LOAD){
            this.setTip("加载必须的资源组："+e.itemsLoaded+"/"+e.itemsTotal);
        }else{
            //ProgressBar.setProgress(e.resItem.name, e.itemsLoaded, e.itemsTotal);
        }
    }

    /** 设置提示文本 */
    private setTip(str:string):void{
        this.tipTf.text = str;
        //this.tipTf.x = (Setting.sw - this.tipTf.measuredWidth)/2;
        //this.tipTf.y = (Setting.sh - this.tipTf.measuredHeight)/2;
    }

    /** 判断一组资源是否被加载过。
     * resGroupName 资源组名。*/
    public isLoaded(resGroupName:string):boolean{
        for(let i:number=0; i<this.groupNames.length; i++){
            if(this.groupNames[i] == resGroupName){
                return true;
            }
        }
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//以下为原有的适配类型

class AssetAdapter implements eui.IAssetAdapter {
    /** 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用 */
    public getAsset(source: string, compFunc:Function, thisObject: any): void {
        function onGetRes(data: any): void {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            let data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }
}

class ThemeAdapter implements eui.IThemeAdapter {
    /** 解析主题
     * @param url 待解析的主题url
     * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用 */
    public getTheme(url:string,compFunc:Function,errorFunc:Function,thisObject:any):void {
        function onGetRes(e:string):void {
            compFunc.call(thisObject, e);
        }
        function onError(e:RES.ResourceEvent):void {
            if(e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
                errorFunc.call(thisObject);
            }
        }
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
    }
}