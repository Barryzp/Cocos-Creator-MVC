import UIControl from "./UIControl";
const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
export default class LabelBinder extends UIControl {
    component:cc.Label=null;

    onLoad(){
        super.onLoad();
        this.component=this.getComponent(cc.Label);

        if(!this.component){
            console.error(`Label Binder:no label component at the node ${this.node.name}`);
        }
    }

    setValue(str:string){
        this.component.string=str;
    }
}
