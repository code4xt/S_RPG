/** 切换场景使用 */
class SceneManager {

	public constructor(m: Main) {
		this.main = m;
		//this.sceneList = new Array<SceneData>();
	}

	protected main: Main;
	protected curScene: any;

	//已经Hide和Holdon类型的场景;
	//protected sceneList:Array<SceneData>;

	protected curSceneName: string;

	/**切换场景*/
	public changeScene(sceneName: string) {

		if (this.curScene != undefined) {
			//移除此场景
		}

		//记录场景名，并且加载场景资源;
		this.curSceneName = sceneName;
		BxGlobal.gResLoader.once(sceneName, this.onSecneResLoadCompleted, this);
		BxGlobal.gResLoader.loadGroup(sceneName);
	}

	/** 场景记载完毕后，切换场景;*/
	protected onSecneResLoadCompleted() {
		var sceneName = this.curSceneName;
		var newScene = this.getSceneFromList(sceneName);

		if (newScene != null) {
			newScene.visible = true;
			return;
		}

		//下面的代码最好用工厂类根据string生成对应的newScene对象，这样可以完全分离代码。
		// if(sceneName == ResType.START) {			
		// 	newScene = new StartScene();        	
		// } else if(sceneName == ResType.MAGIC) {
		// 	newScene = new MagicScene();
		// }

		this.main.addChild(newScene);
		this.curScene = newScene;
		this.curScene.x = 0;
		this.curScene.y = 0;
		this.curScene.width = 640;
		this.curScene.height = 960;
		this.curScene.visible = true;
	}

	protected getSceneFromList(sceneName: string) {
		var ret = null;
		// this.sceneList.forEach(element => {
		// 	if(element.Name == sceneName) {
		// 		ret = element;				
		// 	}
		// });
		return ret;
	}
}