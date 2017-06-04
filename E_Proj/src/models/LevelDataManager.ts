/** 关卡数据管理 */

//every level data item
class LevelDataItem{
    public answer:string;
    public img:string;
    public word:string;
    public tip:string;
    public content:string;
}

//关卡数据管理器
class LevelDataManager{
    private static instance:LevelDataManager;
    public static Instance(){
        if(LevelDataManager.instance == null)
        {
            LevelDataManager.instance = new LevelDataManager();
        }
        return LevelDataManager.instance;
    }

    //关卡数据保存数组
    private items:LevelDataItem[] = [];
    public constructor(){
        this.items = RES.getRes("questions_json");
    }
}