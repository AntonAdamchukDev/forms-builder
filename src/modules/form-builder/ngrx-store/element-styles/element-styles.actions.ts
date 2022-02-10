import { Action } from "@ngrx/store";
import { ElementStyles } from "./element-styles.reducer";

export enum changeActionTypes{
    setStyle = '[SET] styles',
    setKey = '[SET] key',
    setElement = '[SET] element',
    setAll = '[SET] all'
}

export class setAllAction implements Action{
    readonly type = changeActionTypes.setAll;
    constructor(public payload:{
        styles:ElementStyles,
        element:string,
        key:string
    }){}
}

export class stylesSetAction implements Action{
    readonly type = changeActionTypes.setStyle;
    constructor(public payload:{
        styles:ElementStyles
    }){}
}

export class keySetAction implements Action{
    readonly type = changeActionTypes.setKey;
    constructor(public payload:{
        key:string
    }){}
}

export class elementSetAction implements Action{
    readonly type = changeActionTypes.setElement;
    constructor(public payload:{
        element:string
    }){}
}

export type changeActions = setAllAction | stylesSetAction | keySetAction | elementSetAction;