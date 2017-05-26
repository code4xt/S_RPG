/**
 * 进行指定内容分享的标准分享界面，可以分享到QQ，微信，微博等。
 * 指定内容包括自动生成的Img和指定格式的文字。
 */
class SharePanel extends eui.Panel implements  eui.UIComponent {
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