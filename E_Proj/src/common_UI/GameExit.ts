
/**退出游戏标准模块,包含确认退出及取消两个按钮，不会停止当前Game Loop中的逻辑*/
class GameExit extends eui.Component implements  eui.UIComponent {
	/**退出游戏标准模块*/
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}