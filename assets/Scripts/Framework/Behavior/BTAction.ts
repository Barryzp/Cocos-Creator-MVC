import { BTEventName, BTNodeState } from "./BTNameSpace";
import { BTNode } from "./BTNode";

export class BTAction extends BTNode {

  public enter() {
    super.enter()
    this.currentState = BTNodeState.RUN
    this.validRunListener(BTEventName.enter, 0)
  }

  public tick(delta) {
    if (this.currentState != BTNodeState.RUN) {
      return
    }

    this.validRunListener(BTEventName.tick, delta)
  }

  public exit() {
    super.exit()
    this.currentState = BTNodeState.IDLE
    this.validRunListener(BTEventName.exit, 0)
  }
}