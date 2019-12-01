
import BaseContentControl from "../Framework/BaseContentControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestContentControl extends BaseContentControl {

    private _test: number = 0;
    public get test(): number {
        return this._test;
    }
    public set test(value: number) {
        this.setProperty("test");
        this._test = value;
    }
    onLoad(){
        super.onLoad();
    }

    start(){
        super.start();

        /*  初始化
        this.btn1Control=this.findComponet("button1");
        this.btn1Control.setClickHandler(this.helloWorld,this,"10");
        */
    }

    /** 按钮事件的绑定
    helloWorld(target,customData){
        console.log("hello world."+customData)
    }*/
}