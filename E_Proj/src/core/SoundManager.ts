/** 声音管理类 */
class SoundManager {
		//单例
	private static instance:SoundManager;
	public static Instance(){
		if(SoundManager.instance == null)
		{
			SoundManager.instance = new SoundManager();
		}
		return SoundManager.instance;
	}

	private _click:egret.Sound;
	private _word:egret.Sound;
	private _wrong:egret.Sound;

	private _bgm:egret.Sound;
	private _bgm_channel: egret.SoundChannel;//保存用来静音用

	public constructor() {
		this._click = new egret.Sound();
		this._click.load("resource/assets/sound/buttonclick.mp3");

		this._bgm = new egret.Sound();
		this._bgm.load("resource/assets/sound/Music.mp3");
		this._click = new egret.Sound();
		this._click.load("resource/assets/sound/buttonclick.mp3");


	}
}