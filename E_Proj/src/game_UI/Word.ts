/**普通一个字，用来做问题的字块 */
class Word extends eui.Component {
	protected lb_text:eui.Label;
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap,this);
	}

	protected onclick_tap(){
    	console.log(this.lb_text.text);
	    SceneGame.Instance().OnClickWord(this);
	}

	//不做成属性，主要是当应用到eui时，Skin还未指定。
	public setWordText(value:string){
		this.lb_text.text = value;
	}

    //获得真实文字。
	public getWordText():string{
		return this.lb_text.text;
	}
}

/**答案字，继承于问题字，答案字点击时，答案字会消失并将对应的问题字还原显示*/
class AnswerWord extends Word{
    public SelectWord:Word = null;
    public constructor() {
        super();
    }
    protected onclick_tap() {
        if(this.SelectWord != null){
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
        console.log("AnswerWord");
    }
    //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
    public SetSelectWord(word:Word){
        if(word != null)
        {
        this.setWordText(word.getWordText());
        this.SelectWord = word;
        word.visible = false;
        }else{
            this.setWordText("");
            this.SelectWord = null;
        }
    }
}