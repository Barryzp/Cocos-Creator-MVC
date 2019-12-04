import { LogError, isAValue, LogInfo, NORMAL_EXCUTE } from "./Config";
import UIManager from "../UIManager";
import BaseContentControl from "./BaseContentControl";

const { ccclass, property, executionOrder ,disallowMultiple} = cc._decorator;

/**
 * 注意不要和ContentControl同级，即使同级，也要放在PanelControl下面
 * 对于UIControl，得延迟初始化，因为我们不需要直接使用这个脚本了，
 * 我们需要等contentControl这些重要组件都初始化完毕然后以及普通脚本都初始化完毕再做此脚本的初始化
 */

@ccclass
@disallowMultiple()
@executionOrder(NORMAL_EXCUTE)
export default abstract class UIControl extends cc.Component {
    @property({
        tooltip: "控件名(每个content下面的这个名称不要一致)"
    })
    controlName: string = "";
    @property({
        tooltip: "内容名(每个content下面的这个名称不要一致)，如果不填写默认会寻找其父节点"
    })
    contentName: string = "";
    //相应的组件
    component: any = null;
    contentControl: BaseContentControl = null;
    onLoad() {
        this.register();
        LogInfo("UIControl");
    }

    start() {
        console.log(this.controlName);
        //HACK:对于LabelBinder,ProgressBinder,这个部分应该是相同的,可以再抽象抽象
        let value = this.contentControl[this.controlName];
        if (isAValue(value)) this.setValue(value);
    }

    setValue(value:any){
    }

    onDestroy() {
        this.unRegister();
    }

    register() {
        if (this.contentName == '') {
            let node = this.node;
            while (true) {
                node = node.parent;
                let contentControl = node.getComponent(BaseContentControl);
                if (contentControl) {
                    contentControl.registeControl(this);
                    return;
                }

                if (node == cc.Canvas.instance.node.parent) {
                    LogError(`cant find contentControl on the node named ${this.controlName} 's ancestor.`);
                    return;
                }
            }
        } else {
            UIManager.instance.registerControl(this);
        }
    }

    unRegister() {
        this.contentControl.unRegisteControl(this);
        //UIManager.instance.unRegisterControl(this);
    }
}
