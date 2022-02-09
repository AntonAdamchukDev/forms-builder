import { changeActions, changeActionTypes} from "./element-styles.actions";

export const stylesNode = 'styles';

export interface ElementStyles{
    'height': string,
    'width': string,
    'border-width': string,
    'border-color': string,
    'border-style': string,
    'border-radius': string,
    'font-size':string,
    'font-weight':string,
    'color':string,
    'placeholder': string,
    'required':string
}

export interface CheckedElementStyles{
    styles:ElementStyles,
    element:string,
    key:string
}

const initialState:CheckedElementStyles = {
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
    },
    element:'',
    key:''
}

export const checkedElementStyleReducer = (state=initialState,action:changeActions) => {
    switch (action.type){
        case changeActionTypes.setAll:
            return{
                ...state,
                styles:action.payload.styles,
                element:action.payload.element,
                key:action.payload.key,
            }
        case changeActionTypes.setStyle:
            return {
                ...state,
                styles:action.payload.styles,
            }
        case changeActionTypes.setKey:
            return{
                ...state,
                key:action.payload.key
            }
        case changeActionTypes.setElement:
            return{
                ...state,
                element:action.payload.element
            }
        default:
            return state;
    }
}