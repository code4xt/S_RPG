/**游戏开始场景 */
class SceneBegin extends eui.Component {
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
	}
}