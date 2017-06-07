/** 关卡数据管理 */

//every level data item
class LevelDataItem {
    public answer: string;
    public img: string;
    public word: string;
    public tip: string;
    public content: string;
}

//关卡数据管理器
class LevelDataManager {
    private static instance: LevelDataManager;
    public static Instance() {
        if (LevelDataManager.instance == null) {
            LevelDataManager.instance = new LevelDataManager();
        }
        return LevelDataManager.instance;
    }

    //关卡数据保存数组
    private items: LevelDataItem[] = [];
    public constructor() {
        this.items = RES.getRes("questions_json");
    }
    //通过关卡号获得一个关的数据
    public GetLevel(level: number): LevelDataItem {
        if (level < 0) level = 0;
        if (level >= this.items.length) level = this.items.length - 1;
        return this.items[level];
    }
    //获得当前的游戏最远进度
    public get Milestone(): number {
        var milestone = egret.localStorage.getItem("CYDTZ_Milestone");
        //如果没有数据，那么默认值就是第一关
        if (milestone == "" || milestone == null) {
            milestone = "1";
        }
        return parseInt(milestone);
    }
    //设置当前的游戏最远进度
    public set Milestone(value: number) {
        egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
    }
}