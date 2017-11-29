class SceneLevels extends eui.Component 
{
    //单例
	private static instance:SceneLevels;
	/** 单例延迟实例化的标准实现 */
    public static Instance(){
		if(SceneLevels.instance == null)
		{
			SceneLevels.instance = new SceneLevels();
		}
		return SceneLevels.instance;
	}

	private btn_back: eui.Button;
	private group_levels: eui.Group;

	//正式游戏中的选定，进入流程需要标识一下当前选中的关数。
	private img_arrow:eui.Image;

    private sel_level: number = 0;
    private LevelIcons:LevelIcon[] = [];

	public constructor() {
		super();
		this.skinName = "resource/game_UI/SceneLevelSkin.exml";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back,this);
        //创建地图选项
        var row = 20;
        var col = 10;
        var spanx = 720 / col;      //计算行x间隔
        var spany = 1136 / row;     //计算列y间隔
        var group = new eui.Group();//地图背景
        group.width = 720;
        group.height = (spany * 50 );//算出最大尺寸
        //填充背景
        for(var i = 0;i <= (group.height / 1138) ;i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img,0);
        }
        //以正弦曲线绘制关卡图标的路径
        var milestone:number = LevelDataManager.Instance().Milestone;
        for(var i = 0; i<50;i++){
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spany * i /2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i /2;
            icon.y = group.height - icon.y - spany;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_level,this);
            //根据进度设置关卡显示
            icon.enabled = i < milestone;
            this.LevelIcons.push(icon);
        }
        //开启位图缓存模式
        group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
		this.group_levels.scrollV = group.height - 1100;

		//跟踪箭头
		this.img_arrow = new eui.Image();
		this.img_arrow.source = RES.getRes("PageDownBtn_png");
		this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
		this.img_arrow.anchorOffsetY = 76;
		this.img_arrow.touchEnabled = false;
		this.img_arrow.x = group.getChildAt(0).x;
		this.img_arrow.y = group.getChildAt(0).y;
		group.addChild(this.img_arrow);
	}

	private onclick_back() {
        this.parent.addChild(SceneBegin.Instance());
        this.parent.removeChild(this);
        
    }
	private onclick_level(e: egret.TouchEvent) {
		var icon = <LevelIcon>e.currentTarget;
        if(this.sel_level != icon.Level){
		    this.img_arrow.x = icon.x;
		    this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }else{
            //进入并开始游戏
            this.parent.addChild(SceneGame.Instance());
            SceneGame.Instance().InitLevel(icon.Level);
            this.parent.removeChild(this);
        }
		//console.log(icon.Level);
	}

    public OpenLevel(level:number){
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if(level > LevelDataManager.Instance().Milestone)
        {
            LevelDataManager.Instance().Milestone = level;
            //同时
            this.img_arrow.x = icon.x;
		    this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
    }
}