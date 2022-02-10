import { Action } from "@ngrx/store";
import { ElementStyles } from "../element-styles/element-styles.reducer";

export enum changeFormActionTypes{
    setFormStyle = '[SET] form styles',
}

export class stylesFormSetAction implements Action{
    readonly type = changeFormActionTypes.setFormStyle;
    constructor(public payload:{
        styles:ElementStyles
    }){}
}

export type changeFormActions = stylesFormSetAction;