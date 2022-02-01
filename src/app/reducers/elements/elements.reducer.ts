import { changeActions, changeActionTypes } from "./elements.actions";

export const elementsNode = 'elementsForm';

export interface DragElement{
    element:string,
    key:number
}

export interface Elements{
  elements:DragElement[]
}

const initialState:Elements = {
    elements:[{element:'',key:-1}],
}


export const elementsReducer = (state=initialState,action:changeActions) => {
    switch (action.type){
        case changeActionTypes.setElements:
            return{
                ...state,
                elements:action.payload.elements
            }
        default:
            return state;
    }
}