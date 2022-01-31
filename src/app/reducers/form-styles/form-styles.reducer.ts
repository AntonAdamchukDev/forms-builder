import { ElementStyles } from "../element-styles/element-styles.reducer";
import { changeFormActions, changeFormActionTypes } from "./form-styles.actions";

export const stylesFormNode = 'stylesForm';

const initialState:{styles:ElementStyles}={
    styles:{
        'height': '',
        'width': '',
        'border-width': '',
        'border-color': '',
        'border-style': '',
        'border-radius': '',
        'font-size':'',
        'font-weight':'',
        'color':'',
        'placeholder': '',
        'required':''
    }
}

export const formStyleReducer = (state=initialState,action:changeFormActions) => {
    switch (action.type){
        case changeFormActionTypes.setFormStyle:
            return {
                ...state,
                styles:action.payload.styles,
            }
        default:
            return state;
    }
}