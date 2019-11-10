import BaseContentControl from "./Framework/BaseContentControl";
import ButtonBinder from "./Framework/ButtonBinder";
import LabelBinder from "./Framework/LabelBinder";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameContentControl extends BaseContentControl {

    label:LabelBinder=null;
    btn1Control:ButtonBinder=null;
    onLoad(){
        super.onLoad();
    }

    start(){
        super.start();

        this.btn1Control=this.findComponet("button1");
        this.btn1Control.setClickHandler(this.helloWorld,this,"10");
    }

    helloWorld(target,customData){
        console.log("hello world."+customData)
    }
}
