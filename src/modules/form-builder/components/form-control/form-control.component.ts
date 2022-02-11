import { Component, Input, HostListener, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { setAllAction } from '../../ngrx-store/element-styles/element-styles.actions';
import { CheckedElementStyles, ElementStyles } from '../../ngrx-store/element-styles/element-styles.reducer';
import { selectCheckedElement, selectElement, selectStylesCheckedElement } from '../../ngrx-store/element-styles/element-styles.selectors';
import { FormGroup } from '@angular/forms';
import { starterStyle } from '../../constants/form-builder-constants';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent implements OnInit,OnDestroy{
  @Input() selectableSection!:boolean;
  @Input() form!:FormGroup;
  public elementKey$: Observable<string> = this.store$.pipe(select(selectCheckedElement));
  public element$: Observable<string> = this.store$.pipe(select(selectElement));
  public stylesCheckedElement$: Observable<ElementStyles> = this.store$.pipe(select(selectStylesCheckedElement));
  private notifier = new Subject();
  
  public currentStateElement:CheckedElementStyles={
    styles: starterStyle,
    element:'',
    key:''
  }

  private currentState:CheckedElementStyles = this.currentStateElement;
  
  constructor(private store$: Store<CheckedElementStyles>){}

  ngOnInit(): void {
    if(this.selectableSection){
      this.element$.pipe(takeUntil(this.notifier)).subscribe((element)=>{
        console.log(this.element, this.currentStateElement.element, element)
        this.currentState.element=element;
        console.log(this.currentState.element, ' ',this.currentStateElement.element)
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
    this.notifier.next(true)
    this.notifier.complete()
  }

  @Input() 
  set element(value:string){
    // if(this.selectableSection)
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
