import UIControl from "./UIControl";
import { LogError, isAValue } from "./Config";
const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
export default class LabelBinder extends UIControl {
    component:cc.Label=null;

    onLoad(){
        super.onLoad();
        this.component=this.getComponent(cc.Label);

        if(!this.component){
            LogError(`Label Binder:no label component at the node ${this.node.name}`);
        }
    }

    //HACK:对于LabelBinder,ProgressBinder,这个部分应该是相同的,可以再抽象抽象
    start(){
        let value=this.contentControl[this.controlName];
        if(isAValue(value))this.setValue(value);
    }

    setValue(str:any){
        this.component.string=str.toString();
    }
}
