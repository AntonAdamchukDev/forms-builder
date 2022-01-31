import { Component, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CheckedElementStyles, ElementStyles } from '../reducers/element-styles/element-styles.reducer';
import { Observable } from 'rxjs';
import { selectElement} from '../reducers/element-styles/element-styles.selectors';
import { selectFormStyles } from '../reducers/form-styles/form-styles.selectors';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  public elements = [{element: 'input','key':0},{element:'textarea','key':1},{element:'button',key:2},{element:'check',key:3},{element:'select',key:4}];
  public formElements:{'element':string, key:number}[]=[]; 
  private counter:number = 5;
  public stylingElement = '';
  public stylesForm:ElementStyles ={
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
  private element$: Observable<string> = this.store$.pipe(select(selectElement));
  private styles$: Observable<ElementStyles> = this.store$.pipe(select(selectFormStyles));

  constructor(private store$: Store<CheckedElementStyles>){
  }

  ngOnInit():void{
    this.element$.subscribe((element)=>{
      this.stylingElement=element;
    })
    this.styles$.subscribe((styles)=>{
      this.stylesForm=styles;
    })
  }

  public drop(event: CdkDragDrop<{element:string,key:number}[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.previousContainer.id==='cdk-drop-list-0'){
        this.formElements.splice(event.currentIndex,0,{'element': event.previousContainer.data[event.previousIndex].element, 'key': this.counter++});
        return;
      }
      this.formElements.splice(event.previousIndex,1);
    }
  }
  // form validating(required fields)

}
