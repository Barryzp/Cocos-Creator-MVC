
import BaseContentControl from "../Framework/BaseContentControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestContentControl extends BaseContentControl {

    button1:Function=null;

    private _test: number = 0;
    public get test(): number {
        return this._test;
    }
    public set test(value: number) {
        this.setProperty("test");
        this._test = value;
    }

    private _test2: number = 0;
    public get test2(): number {
        return this._test2;
    }
    public set test2(value: number) {
        this.setProperty("test2");
        this._test2 = value;
    }

    onLoad(){
        super.onLoad();
    }

    start(){
        console.log(this.contentName);

        //HACK:脚本执行顺序有问题，怀疑跟激活节点有关
        //打印次序
//  test2
//  TestContentControl.ts:33 TestContent
//  UIControl.ts:31 button1
//  UIControl.ts:31 test

        this.button1=()=>{
            console.log("btn2 btn click.");
        }
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