import BaseContentControl from "./Framework/BaseContentControl";
import ButtonBinder from "./Framework/ButtonBinder";
import LabelBinder from "./Framework/LabelBinder";
import PanelManager, { PanelName } from "./PanelManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameContentControl extends BaseContentControl {

    private _score: number = 0;
    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        this._score = value;
        this.setProperty("score");
    }

    btn1Control:ButtonBinder=null;
    onLoad(){
        super.onLoad();
    }

    start(){
        super.start();

        PanelManager.instance.showPanel(PanelName.testContent);
        PanelManager.instance.closePanel(PanelName.gameContent);
    }

    helloWorld(target,customData){
        console.log("hello world."+customData)
    }
}
