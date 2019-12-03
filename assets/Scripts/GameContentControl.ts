import BaseContentControl from "./Framework/BaseContentControl";
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

    button1:Function=null;

    onLoad(){
        super.onLoad();
    }

    start(){
        this.button1=()=>{
            console.log("hello btn click event.");
        }

        PanelManager.instance.showPanel(PanelName.testContent);
        PanelManager.instance.closePanel(PanelName.gameContent);
    }

    helloWorld(target,customData){
        console.log("hello world."+customData)
    }
}
