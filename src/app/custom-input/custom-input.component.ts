import { Component, ElementRef, forwardRef, HostListener, Input, ChangeDetectionStrategy, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
    <input #inputField [type]="type||'text'" />
  `,
  styleUrls: ['./custom-input.component.scss'],
  providers: [     
  {       
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => CustomInputComponent),
        multi: true     
  }],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class CustomInputComponent implements ControlValueAccessor {
  @ViewChild('inputField',{static:true, read: ElementRef}) private _elementRef!: ElementRef;
  @Input() type?:string;
  public val:string = ''; 
  constructor(private _renderer:Renderer2) { 
  }

  @HostListener('input',['$event.target.value'])
  onChange: any = (value:string) => {
    this.val=value;
  }
  onTouch: any = () => {}

  set value(val:string){ 
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

  writeValue(){ 
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'value',
      this.val
    );
    this.onChange(this.val);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = (value: string) => {
      this.val = value;
      fn(value);
    };
}

  registerOnTouched(fn: any){
    this.onTouch = fn
  }
}
