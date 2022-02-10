import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { DynamicalFormService } from '../../services/dynamical-form.service';
import { Values } from '../../interfaces/form-builder-interfaces';
import { CheckedElementStyles, ElementStyles } from '../../ngrx-store/element-styles/element-styles.reducer';
import { DragElement } from '../../ngrx-store/elements/elements.reducer';
import { selectElements } from '../../ngrx-store/elements/elements.selectors';
import { selectFormStyles } from '../../ngrx-store/form-styles/form-styles.selectors';

@Component({
  selector: 'app-dynamical-form',
  templateUrl: './dynamical-form.component.html',
  styleUrls: ['./dynamical-form.component.css'],
  providers: [ DynamicalFormService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicalFormComponent implements OnInit,OnDestroy {
  private elements$: Observable<DragElement[]> = this.store$.pipe(select(selectElements));
  private styles$: Observable<ElementStyles> = this.store$.pipe(select(selectFormStyles));
  private notifier = new Subject();
  public form!:FormGroup;
  public formElements!:DragElement[];
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
  constructor(
    private store$: Store<CheckedElementStyles>,
    private dynamicalForm:DynamicalFormService
  ) {
  }
  formValues!:Values;
  ngOnInit(): void {
    this.styles$.pipe(takeUntil(this.notifier)).subscribe((styles)=>{
      this.stylesForm=styles;
    })
    this.elements$.pipe(takeUntil(this.notifier)).subscribe(elements=>{
      this.formElements=elements;
      if(this.form) {
        this.formValues = this.form.value;
      }
      this.form=this.dynamicalForm.toFormGroup(this.formElements);
      this.form.patchValue(this.formValues);
    })
  }

  ngOnDestroy() {
    this.notifier.complete()
  }

  private message?:string;
  submitValues(){
    if(this.form.invalid){
      alert("Some information at the form is invalid!\nCheck if all required fields are filled with value!");
    } else {
      this.message='Information:\n'; 
      for (const key in this.form.value) {
        this.message = this.message+this.form.value[key]+'\n';
      }
      this.message= this.message + 'Succesfully sended!';
      alert(this.message);
    }
  }
}
