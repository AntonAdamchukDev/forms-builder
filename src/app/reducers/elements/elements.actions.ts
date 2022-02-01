import { Action } from "@ngrx/store";
import { DragElement } from "./elements.reducer";

export enum changeActionTypes{
    setElements = '[Elements] set'
}

export class setElementsAction implements Action{
    readonly type = changeActionTypes.setElements;
    constructor(public payload:{
        elements:DragElement[]
    }){}
}

export type changeActions = setElementsAction;