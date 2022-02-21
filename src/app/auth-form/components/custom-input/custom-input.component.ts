import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
    <label>{{ inputLabel ? inputLabel : '' }}</label>
    <input #inputField [type]="inputType" />
  `,
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() inputType!: string;
  @Input() inputLabel?: string;
  @ViewChild('inputField', { static: true, read: ElementRef })
  private _elementRef!: ElementRef;
  public inputValue: string = '';

  constructor(private _renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  onChange: Function = (value: string): void => {
    this.inputValue = value;
  };

  set value(value: string) {
    this.inputValue = value;
    this.onChange(value);
    this.onTouch(value);
  }

  onTouch: Function = (): void => {};

  writeValue(): void {
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'value',
      this.inputValue
    );
    this.onChange(this.inputValue);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = (value: string) => {
      this.inputValue = value;
      fn(value);
    };
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }
}
