import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpComponent {
  _text!: String;
  @Input() success: String = 'Error';
  @Input() set text(value: String) {
    this._text = value;
    if (value.length) this.open();
  }

  public componentClasses = {
    'pop-up-container': true,
    hidden: true,
  };

  public close(): void {
    this.componentClasses.hidden = true;
    this._text = '';
  }

  private open(): void {
    this.componentClasses.hidden = false;
  }
}
