/**
 * 提示模块标准化，提示界面没有任何关闭和确认按钮，如果父对象被销毁,同时销毁。
 */
class Tips extends eui.Component implements  eui.UIComponent {
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