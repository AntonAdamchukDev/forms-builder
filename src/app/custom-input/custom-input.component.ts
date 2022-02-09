import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [     
  {       
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => CustomInputComponent),
        multi: true     
  }]  
})
export class CustomInputComponent implements ControlValueAccessor {
constructor() { }
onChange: any = () => {}
onTouch: any = () => {}
val= "" // this is the updated value that the class accesses
set value(val:string){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
  this.val = val
  this.onChange(val)
  this.onTouch(val)
}
// this method sets the value programmatically
writeValue(value:string){ 
  this.value = value
}
// upon UI element value changes, this method gets triggered
registerOnChange(fn: any){
  this.onChange = fn
}
// upon touching the element, this method gets triggered
registerOnTouched(fn: any){
  this.onTouch = fn
}
}
