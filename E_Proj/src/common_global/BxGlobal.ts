/**
 * 全局对象，保存Main的stage,提供给common_UI直接使用，这里同时也处理游戏标准初始化流程。
 */
class BxGlobal {
	public constructor() {
	}

	public static gResLoader:ResLoader;
	public static gStage:egret.Stage;
	public static gSceneManager:SceneManager;

}