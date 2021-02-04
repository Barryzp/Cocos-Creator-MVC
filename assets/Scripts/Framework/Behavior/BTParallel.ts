import BTComposite from "./BTComposite";
import { BTNodeState, BTResult } from "./BTNameSpace";

export class BTParallel extends BTComposite {
  protected parallelIndex: number[] = []

  /**
   * tick
   */
  public tick(delta: number) {
    if (this.currentState != BTNodeState.RUN) {
      return
    }

    for (const condition of this.conditions) {
      if (!condition.check()) {
        for (let index = 0; index < this.parallelIndex.length; index++) {
          const element = this.children[index];
          if (element.CurrentState == BTNodeState.RUN) {
            element.exit()
          }
        }

        return BTResult.SUCCESS
      }
    }

    this.tickParallel(delta)
  }

  /**
   * tickParallel
   */
  public tickParallel(delta: number) {
    for (let index = 0; index < this.parallelIndex.length; index++) {
      const element = this.parallelIndex[index];
      const runNode = this.children[element]
      runNode.tick(delta)

      if (runNode.CurrentState != BTNodeState.RUN) {
        runNode.exit()
        this.parallelIndex.remove(element)
      }
    }
  }

  public enter(){
    if (!this.check()) {
      this.currentState = BTNodeState.IDLE
      return
    }

    const childrenCount = this.children.length
    for (let index = 0; index < childrenCount; index++) {
      const element = this.children[index]
      element.enter()

      if (element.CurrentState == BTNodeState.RUN){
        this.parallelIndex.push(index)
      }else{
        element.exit()
      }
    }

    if (this.parallelIndex.length > 0) {
      this.currentState = BTNodeState.RUN
    }else{
      this.currentState = BTNodeState.IDLE
    }
  }

  public exit(){
    if (this.currentState == BTNodeState.RUN) {
      for (let index = 0; index < this.parallelIndex.length; index++) {
        const element = this.parallelIndex[index];
        const runNode = this.children[element]
        if (runNode.CurrentState == BTNodeState.RUN) {
          runNode.exit()
        }
      }
    }

    this.parallelIndex = []
    this.currentState = BTNodeState.IDLE
    super.exit()
  }
}