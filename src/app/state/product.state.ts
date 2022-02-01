export enum DataStateEnum{

LOADED,
ERROR,
LODING,
}
export interface AppDataState<T>{
  dataState:DataStateEnum,
  data?:T,
  errorMessage?:string,

}
