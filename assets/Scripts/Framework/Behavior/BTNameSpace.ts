// 行为树节点状态
export enum BTNodeState{
  IDLE = 0,
  RUN = 1,
}

// 行为树节点结果状态
export enum BTResult{
  SUCCESS = 1,
  FAIL = 2,
}

// 行为树相关事件名
export class BTEventName{
  static enter:string = "Enter";
  static check:string = "Check";
  static tick:string = "Tick";
  static exit:string = "Exit";
}

export interface AnyTypeFun2p<T1,T2,T3>{
  (val1:T1,val2:T2):T3;
}

export const VALID_RUN = (func)=>{
  func!= null?func():false
}