import { SECOND_EXCUTE, LogError } from "./Config";
import UIManager from "../UIManager";
import BaseContentControl from "./BaseContentControl";

const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 注意不要和ContentControl同级，即使同级，也要放在PanelControl下面
 */

@ccclass
@executionOrder(SECOND_EXCUTE)
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
        console.log("UIControl");
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
