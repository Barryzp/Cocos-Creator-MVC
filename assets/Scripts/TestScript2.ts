
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestScript2 extends cc.Component {
  
  @property(cc.Node)
  panel1:cc.Node=null;
  @property(cc.Node)
  panel2:cc.Node=null;

  onLoad() { 

  }

  start() { 
    this.panel1.active=false;
    this.panel2.active=true;
  }

  update(dt) { 

  }
  
}