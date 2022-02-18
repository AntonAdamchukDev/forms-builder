import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpComponent {
  @Input() success: String = 'Error';
  public componentClasses = {
    'pop-up-container': true,
    hidden: true,
  };
  private _text!: String | null;

  @Input() set text(value: String | null) {
    this._text = value || '';
    if (value?.length) this.open();
  }

  get text(): String {
    return this._text ? this._text : '';
  }

  public close(): void {
    this.componentClasses.hidden = true;
    this._text = '';
  }

  private open(): void {
    this.componentClasses.hidden = false;
  }
}
