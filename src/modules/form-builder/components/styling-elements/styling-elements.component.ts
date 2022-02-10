import { Component, Input, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { stylesSetAction } from '../../ngrx-store/element-styles/element-styles.actions';
import { CheckedElementStyles, ElementStyles } from '../../ngrx-store//element-styles/element-styles.reducer';
import { selectCheckedElement, selectStylesCheckedElement } from '../../ngrx-store/element-styles/element-styles.selectors';
import { stylesFormSetAction } from '../../ngrx-store/form-styles/form-styles.actions';

@Component({
  selector: 'app-styling-elements',
  templateUrl: './styling-elements.component.html',
  styleUrls: ['./styling-elements.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StylingElementsComponent implements OnChanges {
  @Input() title:string='';
  @Input() element!:string;
  public key:string ='';
  public stylesCheckedElement$: Observable<ElementStyles> = this.store$.pipe(select(selectStylesCheckedElement));
  public elementKey$: Observable<string> = this.store$.pipe(select(selectCheckedElement));

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
  constructor(private store$: Store<CheckedElementStyles>) {}

  ngOnChanges(): void {
    if( this.element !='form'){
      this.stylesCheckedElement$.subscribe( styles=>{
        this.currentStateElement.styles=styles;
        this.stylesElement.setValue(this.currentStateElement.styles);
      })
    }
  }
  
  public stylesElement:FormGroup = new FormGroup({
    'height': new FormControl(this.currentStateElement.styles['height']),
    'width': new FormControl(this.currentStateElement.styles['width']),
    'border-width': new FormControl(this.currentStateElement.styles['border-width']),
    'border-color': new FormControl(this.currentStateElement.styles['border-color']),
    'border-style': new FormControl(this.currentStateElement.styles['border-style']),
    'border-radius': new FormControl(this.currentStateElement.styles['border-radius']),
    'font-size':new FormControl(this.currentStateElement.styles['font-size']),
    'font-weight':new FormControl(this.currentStateElement.styles['font-weight']),
    'color':new FormControl(this.currentStateElement.styles['color']),
    'required': new FormControl(this.currentStateElement.styles['required']),
    'placeholder': new FormControl(this.currentStateElement.styles['placeholder'])
  }); 

  public changeStyles(){
    this.currentStateElement.styles=this.stylesElement.value;
    if (this.element==='form'){
      this.store$.dispatch(new stylesFormSetAction({styles:this.currentStateElement.styles}))
      return;
    }
    this.store$.dispatch(new stylesSetAction({styles:this.currentStateElement.styles}))
  }
}
