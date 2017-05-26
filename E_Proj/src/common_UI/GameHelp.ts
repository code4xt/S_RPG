/**游戏帮助面板，包含数个面板及其切换，美术策划修改其中文字即可。
 * 程序需要考虑多语言版本的实现方法，对于帮助面板这是最重要的功能。
 */
class GameHelp extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}
}
