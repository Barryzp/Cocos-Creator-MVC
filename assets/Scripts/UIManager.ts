import BaseContentControl from "./Framework/BaseContentControl";
import UIControl from "./Framework/UIControl";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    contentMap: Map<string, BaseContentControl> = new Map<string, BaseContentControl>();
    private static _instance: UIManager = null;
    public static get instance(): UIManager {
        return this._instance;
    }

    onLoad() {
        UIManager._instance = this;
        cc.game.addPersistRootNode(this.node);

        console.log("UIManager");
    }

    start() {
        cc.director.loadScene('Game');
    }

    show(){
        
    }

    registeContent(contentName: string, contentControl: BaseContentControl) {
        if (this.contentMap.has(contentName)) {
            console.error(`registeContent fun:there is a repeat content named ${contentName} in UIManager!`);
        } else {
            this.contentMap.set(contentName, contentControl);
        }
    }

    unRegisteContent(contentControl: BaseContentControl) {
        let contentName = contentControl.contentName;
        if (this.contentMap.has(contentName)) {
            this.contentMap.delete(contentName);
            console.log(`${contentName} content unRegisted successed.`)
        } else {
            console.error(`unRegisteContent fun:no content named ${contentName}  in UIManager!`);
        }
    }

    registerControl(control: UIControl) {
        let contentName = control.contentName;
        let contentControl = this.contentMap.get(contentName);
        if (contentControl) {
            if (contentControl.uiControlMap.has(contentName)) {
                console.error(`registerControl fun:control named ${control.controlName} repeated in ${contentName}!`);
            } else {
                contentControl.registeControl(control);
            }
        } else {
            console.error(`registerControl fun:there isnt a content named ${contentName} in ${contentName}!`);
        }
    }

    unRegisterControl(control: UIControl) {
        let contentName = control.contentName;
        let contentControl = this.contentMap.get(contentName);
        if (contentControl) {
            contentControl.unRegisteControl(control);
        } else {
            console.error(`unRegisterControl fun:no control named ${contentName} in ${control.controlName}!`);
        }
    }
}
