import BTComposite from "./BTComposite";
import { BTNodeState } from "./BTNameSpace";

export class BTSelector extends BTComposite {

  protected selectorIndex:number = 0

  public tick(delta:number){
    if (this.currentState != BTNodeState.RUN) {
      return
    }

    for (let index = 0; index < this.conditions.length; index++) {
      const condition = this.conditions[index];
      if (!condition.check()) {
        const child = this.children[this.selectorIndex]
        if (BTNodeState.RUN == child.CurrentState) {
          child.exit()
        }

        this.currentState = BTNodeState.RUN
        return
      }
    }

    this.tickSelector(delta)
  }

  public tickSelector(delta:number){
    const child = this.children[this.selectorIndex]
    child.tick(delta)

    if (child.CurrentState == BTNodeState.RUN) {
      child.exit()

      const childCount = this.children.length
      const length = this.selectorIndex + childCount
      for (let index = 0; index < length; index++) {
        this.selectorIndex = index % childCount
        const childBro = this.children[this.selectorIndex]
        childBro.enter()
        if (childBro.CurrentState != BTNodeState.RUN) {
          childBro.exit()
        }else{
          return
        }
      }
    }

    this.currentState == BTNodeState.RUN
  }

  public enter(){
    if (!this.check()) {
      // HACK
    }
  }
}