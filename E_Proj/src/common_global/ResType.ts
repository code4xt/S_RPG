/** 所有的资源分组类型定义 */
class ResType {
	/** 预加载资源组 */
	static PRE_LOAD:string = "preload";
	/** 登录场景所需的资源组 */
	static LOGIN:string = "login";
	/** 游戏场景所需的资源组 */
	static GAME:string = "game";
	/** 帮助资源组 */
	static HELP:string = "help";
	/** 翻牌游戏资源组 */
	static FLIP:string = "flip";
	/** 翻牌帮助规则资源组 */
	static FLIP_RULE:string = "flipRule";

	/** 获取分组定义的中文说明
	 * name 分组定义名。*/
	static getDesc(name:string):string{
		var str:string = null;
		switch(name){
			case ResType.PRE_LOAD : str = "预加载资源组"; break;
			case ResType.LOGIN : str = "登录场景所需的资源组";  break;
			case ResType.GAME : str = "游戏场景所需的资源组";  break;
			case ResType.HELP : str = "帮助资源组";  break;
			case ResType.FLIP : str = "翻牌游戏资源组";  break;
			case ResType.FLIP_RULE : str = "翻牌帮助规则资源组";  break;
		}
		return str;
	}
}