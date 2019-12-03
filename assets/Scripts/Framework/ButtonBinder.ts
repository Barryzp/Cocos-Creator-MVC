import UIControl from "./UIControl";
import { LogError } from "./Config";
const { ccclass, property, requireComponent } = cc._decorator;

export interface ICommand{
    action:Function;    
}


@ccclass
@requireComponent(cc.Button)
export default class ButtonBinder extends UIControl {

    component: cc.Button = null;

    //#region Deplicate
    // @property({ tooltip: "是否可以添加多个点击事件" })
    addMoreListener = true;
    handlers: Function[] = [];
    handlerTargets: any[] = [];
    //#region 
    onLoad() {
        super.onLoad();
        this.component = this.getComponent(cc.Button);
        if (!this.component) {
            LogError(`ButtonBinder:no button component at the node ${this.node.name}`);
        }
    }

    setValue(value:Function){
        this.setClickHandler(value);
    }

    /**
     * 设置按钮点击事件回调
     * @param handler 函数
     * @param callTarget 函数调用对象
     * @param customData 自定义数据
     */
    setClickHandler(handler: Function, callTarget = null, customData = null) {
        if (!this.addMoreListener && this.component.clickEvents.length > 0) return;

        this.handlers.push(handler);
        this.handlerTargets.push(callTarget);

        let eventHander = new cc.Component.EventHandler();
        eventHander.target = this.node;
        eventHander.component = "ButtonBinder";
        eventHander.handler = "clickFunction";
        eventHander.customEventData = customData;
        this.component.clickEvents.push(eventHander);
    }

    private clickFunction(target, customData) {
        for (let index = 0; index < this.handlers.length; index++) {
            let callBack = this.handlers[index];
            let callTarget = this.handlerTargets[index];
            callBack && callBack.call(callTarget, target,customData);
        }
    }
}
