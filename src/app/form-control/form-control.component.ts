import { Component, Input, HostListener, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { setAllAction } from '../reducers/element-styles/element-styles.actions';
import { CheckedElementStyles, ElementStyles } from '../reducers/element-styles/element-styles.reducer';
import { selectCheckedElement, selectElement, selectStylesCheckedElement } from '../reducers/element-styles/element-styles.selectors';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent implements OnInit,OnDestroy{
  @Input() selectableSection!:boolean;
  @Input() form!:FormGroup;
  public elementKey$: Observable<string> = this.store$.pipe(select(selectCheckedElement));
  public element$: Observable<string> = this.store$.pipe(select(selectElement));
  public stylesCheckedElement$: Observable<ElementStyles> = this.store$.pipe(select(selectStylesCheckedElement));
  private notifier = new Subject();
  
  private currentStateElement:CheckedElementStyles={
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

  private currentState:CheckedElementStyles={styles:this.styles,element:'',key:''};
  
  constructor(private store$: Store<CheckedElementStyles>){}

  ngOnInit(): void {
    if(this.selectableSection){
      this.element$.pipe(takeUntil(this.notifier)).subscribe((element)=>{
        this.currentState.element=element;
      });
      this.elementKey$.pipe(takeUntil(this.notifier)).subscribe((key)=>{
        this.currentState.key=key;
      });
      this.stylesCheckedElement$.pipe(takeUntil(this.notifier)).subscribe((styles)=>{
        if((this.element===this.currentState.element)&&(this.currentState.key===this.currentStateElement.key)){
          this.currentStateElement.styles=styles;
          if(this.currentStateElement.styles.required==='required'){
            this.formControlClasses.required=true;
          } else {
            this.formControlClasses.required=false;
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.notifier.complete()
  }

  @Input() 
  set element(value:string){
    this.currentStateElement.element=value;
  }
  @Input()
  set key(value:string){
    this.currentStateElement.key=value
  }

  get styles():ElementStyles{
    return this.currentStateElement.styles
  }

  get element():string{
    return this.currentStateElement.element
  }

  get key():string{
    return this.currentStateElement.key
  }
  
  public formControlClasses={
    'form-control':true,
    'required':false,
    'blue-border':false
  }
  
  private skipClick:boolean = true;

  public clickOnFormControl(){
    if(!this.selectableSection) return
    this.formControlClasses['blue-border'] = true;
    this.skipClick = true;
    this.store$.dispatch(new setAllAction({styles:this.styles,element:this.element,key:this.currentStateElement.key}))
  }

  @HostListener('window:click')
  clickOutOfForm(){
    if(this.skipClick){
      this.skipClick = false;
      return;
    } 
    this.formControlClasses['blue-border'] = false;
  }
}
