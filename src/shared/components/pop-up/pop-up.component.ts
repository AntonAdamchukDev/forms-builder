import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpComponent {
  _text!: String;
  @Input()
  set text(value: String) {
    this._text = value;
    if (value) this.open();
  }
  @Input() success: String = 'Error';
  public componentClasses = {
    'pop-up-container': true,
    hidden: true,
  };

  public close() {
    this.componentClasses.hidden = true;
    this._text = '';
  }

  private open() {
    this.componentClasses.hidden = false;
  }
}
