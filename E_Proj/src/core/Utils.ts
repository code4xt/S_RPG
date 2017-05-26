class Utils {
	public constructor() {}

	/** 通过一个已经加载的资源名称创建一个位图显示对象。
	 * name 已经加载的资源名 */
	static  createBitmapByName(name: string):egret.Bitmap {
        let result:egret.Bitmap = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /** 取得一个颜色矩阵滤镜 */
    static grayFilter():egret.ColorMatrixFilter{
        var colorMatrix:number[] = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        return new egret.ColorMatrixFilter(colorMatrix);
    }

    /** 色调滤镜 */
    static grayTint(color){
        var cStr:string = color.toString(16);
        var colorMatrix:number[] = [
            0, 0, 0, 0, parseInt(cStr.substr(0, 2), 16),
            0, 0, 0, 0, parseInt(cStr.substr(2, 2), 16),
            0, 0, 0, 0, parseInt(cStr.substr(4, 2), 16),
            0, 0, 0, 1, 0
        ];
        return new egret.ColorMatrixFilter(colorMatrix);
    }

    /** 获取网页传来的参数，即url中"?"符后的字串所代表的键值对 */
    static getUrlParam():any{
        var url:string = decodeURI(location.search); 
        var obj:any = null;
        if (url.indexOf("?") != -1) {
            obj = new Object();
            var str:string = url.substr(1);
            var strs:string[] = str.split("&");
            var arr:string[];
            for(var i:number = 0; i < strs.length; i ++) {
                arr = strs[i].split("=");
                if(arr.length == 2) {
                    obj[arr[0]] = arr[1];
                }
            }
        }
        return obj;
    }

    /** 以二进制的形式，或取一个字节的某几位所表示的数字。
     * n 要从中获取位的数字，n<=255。
     * index 从第几个缩影开始获取（缩影从0开始）。
     * length 要获取位的长度。*/
    static getNumberByBit(n:number, index:number, length:number):number{
        let str:string = n.toString(2);
        let len:number = 8-str.length;
        for(let i:number=0; i<len; i++){
            str = "0"+str;
        }
        return parseInt(str.substr(index, length), 2);
    }

    /** 获取移动方向 */
	static getDir(px,py,mx,my):number{
		let dir:number;
        let a:number = Utils.getAngle(px,py,mx,my);
        if(a >= 0 && a < 45){
            dir = Dir.RIGHT;
        }else if(a >= 45 && a < 135){
            dir = Dir.DOWN;
        }else if(a >= 135 && a < 225){
            dir = Dir.LEFT;
        }else if(a >= 225 && a < 315){
            dir = Dir.UP;
        }else if(a >= 315 && a < 360){
            dir = Dir.RIGHT;
        }
		return dir;
	}
	
	/** 获取两点间的角度 */
	static getAngle(sx:number, sy:number, ex:number, ey:number):number{
		//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        let x:number = Math.abs(ex-sx);
        let y:number = Math.abs(ey-sy);
        let d:number = Math.sqrt(x*x+y*y);
        let cos:number = y/d;
        let radina:number = Math.acos(cos);
        let angle:number = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

		//y轴负方向
        if(ex==sx && ey>sy) angle = 90;
		//轴正方向
        if(ex==sx && ey<sy) angle = 270;
		//x轴正方向
        if(ex>sx && ey==sy) angle = 0;
		//x轴负方向
        if(ex<sx && ey==sy) angle = 180;
		//第一象限
        if(ex>sx && ey>sy)angle = angle;
		//第二象限
		if(ex<sx && ey>sy) angle = 90+angle;
		//第三象限
        if(ex<sx && ey<sy) angle = 180+angle;
		//第四象限
        if(ex>sx && ey<sy) angle = 360-angle;
        return angle;
    }
}