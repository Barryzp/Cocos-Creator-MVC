import { BTNodeState, BTEventName } from "./BTNameSpace"
import { BTNode } from "./BTNode"

export class BTCondition extends BTNode {
  public enter() {
    super.enter()
    this.currentState = BTNodeState.RUN
    this.validRunListener(BTEventName.enter, 0)
  }

  public check(): boolean {
    this.validRunListener(BTEventName.check, 0)
    return true
  }

  public exit() {
    super.exit()
    this.currentState = BTNodeState.IDLE
    this.validRunListener(BTEventName.exit, 0)
  }
}