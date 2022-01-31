import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { elementActionsType, elementCheckAction } from "./reducers/checked-element/checked-element.actions";
import { map } from "rxjs";

@Injectable()
export class AppEffects{
    constructor(private actions$: Actions){}

}