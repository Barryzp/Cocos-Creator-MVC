export const FIRST_EXCUTE=-1;
export const NORMAL_EXCUTE=1;

export const LOG_INFO="BARRY_MVC_LOG_INFO: ";
export const LOG_ERROR="BARRY_MVC_LOG_ERROR: ";
export const LogInfo=(str:string)=>{
    console.log(LOG_INFO+str);
};
export const LogError=(str:string)=>{
    console.error(LOG_ERROR+str);
};

export const isAValue=function(value):boolean{
    return value!=null&&value!=undefined;
}