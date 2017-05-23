/**
 * 就是原来微软的MessageBox，可指定1~3个按钮及其处理函数，还可指定Title及Logo。
 * Alert和Message都使用同一个对象即可。只是不同的title和Logo
 */
class MsgBox extends eui.Panel implements  eui.UIComponent {
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