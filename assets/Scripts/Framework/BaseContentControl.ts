import UIControl from "./UIControl";
import { FIRST_EXCUTE } from "./Config";
import UIManager from "../UIManager";

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(FIRST_EXCUTE)
export default abstract class BaseContentControl extends cc.Component {
    @property({
        tooltip: "内容名"
    })
    contentName:string = "";
    //这个panel下面的所有控件的一个集合
    uiControlMap: Map<string, UIControl> = new Map<string, UIControl>();

    onLoad() {
        UIManager.instance.registeContent(this.contentName, this);
        console.log("BaseContentControl");
    }

    start() {

    }

    show() {
        this.node.active = true;

        //TODO:动画播放
    }

    close() {
        this.node.active = false;

        //TODO:动画播放
    }

    findComponet(controlName:string):any{
        let control=this.uiControlMap.get(controlName);
        if(!control){
            console.error(`FindComponet fun:there isnt a control named ${controlName} in ${this.contentName}`);
            return ;
        }

        return control;
    }

    /**
     * 注册相关绑定控件
     */
    registeControl(control: UIControl) {
        if (this.uiControlMap.has(control.controlName)) {
            console.error(`registeControl fun:there is a repeat control named ${control.controlName} in ${this.contentName}!`);
        } else {
            this.uiControlMap.set(control.controlName, control);
            control.contentControl=this;
        }
    }

    /**
     * 取消注册相关绑定控件
     */
    unRegisteControl(control: UIControl) {
        if (this.uiControlMap.has(control.controlName)) {
            this.uiControlMap.delete(control.controlName);
            console.log(`${control.controlName} control unRegisted successed.`)
        } else {
            console.error(`unRegisteControl fun:there isnt a control named ${control.controlName} in ${this.contentName}!`);
        }
    }



    //TODO:需要测试销毁这个地方，可能会出现问题
    onDestroy() {
        UIManager.instance.unRegisteContent(this);
    }
}
