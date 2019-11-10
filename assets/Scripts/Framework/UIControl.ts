import { SECOND_EXCUTE } from "./Config";
import UIManager from "../UIManager";

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
    controlName:string = "";
    @property({
        tooltip: "内容名(每个content下面的这个名称不要一致)"
    })
    contentName:string = "";
    //相应的组件
    component: any = null;
    onLoad() {
        this.register();
        console.log("UIControl");
    }

    onDestroy() {
        this.unRegister();
    }

    register() {
        UIManager.instance.registerControl(this);
    }

    unRegister() {
        UIManager.instance.unRegisterControl(this);
    }
}
