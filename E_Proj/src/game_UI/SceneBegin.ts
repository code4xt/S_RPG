/**游戏开始场景 */
class SceneBegin extends eui.Component {
	//单例
	private static instance:SceneBegin;
	public static Instance(){
		if(SceneBegin.instance == null)
		{
			SceneBegin.instance = new SceneBegin();
		}
		return SceneBegin.instance;
	}

	private btn_begin:eui.Button;
	public constructor() {
		super();
		this.skinName = SceneBeginSkin;
	}

	childrenCreated(){
		super.childrenCreated();
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin,this);
	}

	private onclick_begin(){
		console.log("game_begin!");
		//开始游戏时将选关界面显示出来
		this.parent.addChild(SceneLevels.Instance())
		this.parent.removeChild(this);
	}
}