import UIManager from "./UIManager";
import { LogError } from "./Framework/Config";

const { ccclass, property } = cc._decorator;

export class PanelName{
  public static readonly gameContent="GameContent";
  public static readonly testContent="TestContent";
}

@ccclass
export default class PanelManager extends cc.Component {

  @property(cc.Node)
  panelList:cc.Node[]=[];

  private openPanelList:cc.Node[]=[];

  private _curentPanel: cc.Node = null;
  public get curentPanel(): cc.Node {
    return this._curentPanel;
  }
  public set curentPanel(value: cc.Node) {
    this._curentPanel = value;
  }

  private static _instance: PanelManager = null;
  public static get instance(): PanelManager {
    return this._instance;
  }

  onLoad() {
    PanelManager._instance = this;

    this.init();
  }

  private init(){
    for(let item of this.panelList){
      if(item.active==true)this.openPanelList.push(item);
    }
  }

  private findPanel(name:string){
    let panel:cc.Node=null;
    for(let item of this.panelList){
      if(item.name===name){
        panel=item;
        break;
      }
    }

    if(panel)return panel;

    LogError(`cant find panel named ${name}`);
    return;
  }

  showPanel(name:string){
    let panel=this.findPanel(name);
    this.openPanelList.contain(panel)?null:(panel.active=true,this.openPanelList.push(panel));
  }

  closePanel(name:string){
    let panel=this.findPanel(name);
    panel.active=false;
    this.openPanelList.remove(panel);
  }
}