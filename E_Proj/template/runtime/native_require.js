
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"polyfill/promise.js",
	"bin-debug/common_global/ResType.js",
	"bin-debug/common_global/SceneManager.js",
	"bin-debug/common_global/SceneType.js",
	"bin-debug/common_UI/BxLoading.js",
	"bin-debug/common_UI/component/MsgBox.js",
	"bin-debug/common_UI/component/ProgressBar.js",
	"bin-debug/common_UI/component/Tips.js",
	"bin-debug/common_UI/GameExit.js",
	"bin-debug/common_UI/GameHelp.js",
	"bin-debug/common_UI/Login.js",
	"bin-debug/common_UI/SharePanel.js",
	"bin-debug/core/ErrorHandler.js",
	"bin-debug/core/IScene.js",
	"bin-debug/core/NetWorkProxy.js",
	"bin-debug/core/ResLoader.js",
	"bin-debug/core/ScreenLocker.js",
	"bin-debug/core/Utils.js",
	"bin-debug/game_logic/KeyboardManager.js",
	"bin-debug/game_UI/XXXPanel.js",
	"bin-debug/Main.js",
	"bin-debug/protocol/AllProtocolDef.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};