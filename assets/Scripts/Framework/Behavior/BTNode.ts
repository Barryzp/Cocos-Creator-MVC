import { AnyTypeFun2p, BTNodeState } from "./BTNameSpace";

export class BTNode {
  protected nodeListener: Function = null
  protected currentState: BTNodeState = BTNodeState.IDLE
  public get CurrentState(): BTNodeState {
    return this.currentState
  }

  public enter() {
  }

  public tick(delta:number) {
  }

  public exit() {

  }

  /**
   * 
   * @param fun 绑定的函数
   * @param target 调用对象
   * @param param 可选参数
   */
  public setNodeListener(fun: AnyTypeFun2p<string, number, any>, target, param) {
    let func = fun.bind(target, param)
    this.nodeListener = func
  }

  public validRunListener(eventName: string, param: any) {
    this.nodeListener == null ? false : this.nodeListener(eventName, param)
  }
}