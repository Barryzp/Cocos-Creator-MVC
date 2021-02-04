import { BTCondition } from "./BTCondition";
import { BTNodeState, BTEventName, BTResult } from "./BTNameSpace";
import { BTNode } from "./BTNode";

export default class BTComposite extends BTNode {
    protected conditions:BTCondition[] = []   // 前置条件
    protected children:BTNode[] = []          // 子节点

    /**
     * addChild
     */
    public addChild(child:BTNode) : BTNode {
        this.children.push(child)
        return child
    }

    /**
     * removeChild
     */
    public removeChild(child:BTNode) : BTNode {
        this.children.remove(child)
        return child
    }

    /**
     * findChild
     */
    public findChild(child:BTNode) {
        return this.children.indexOf(child)
    }

    /**
     * addCondition
     */
    public addCondition(condition:BTCondition) {
        this.conditions.push(condition)
    }

    /**
     * removeCondition
     */
    public removeCondition(condition:BTCondition) {
        this.conditions.remove(condition)
    }

    /**
     * check
     */
    public check() : BTResult {
        for (const condition of this.conditions) {
            if (condition.check()) {
                condition.enter()
            }else{
                return BTResult.SUCCESS
            }
        }

        return BTResult.FAIL
    }

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

        for (const condition of this.conditions) {
            if (condition.CurrentState == BTNodeState.RUN) {
                condition.exit()
            }
        }
    }
}