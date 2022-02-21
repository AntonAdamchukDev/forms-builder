import {
  Component,
  Input,
  HostListener,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { setAllAction } from '../../store/element-styles/element-styles.actions';
import {
  CheckedElement,
  ElementStyles,
} from '../../store/element-styles/element-styles.reducer';
import {
  selectCheckedElement,
  selectElement,
  selectStylesCheckedElement,
} from '../../store/element-styles/element-styles.selectors';
import { FormGroup } from '@angular/forms';
import { initialCheckedElement } from '../../constants/form-builder-constants';
import { UnsubscriberService } from '../../../shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements OnInit {
  @Input() selectableSection!: boolean;
  @Input() form!: FormGroup;
  @Input() set elementType(value: string) {
    this.currentStateElement.element = value;
  }
  @Input() set key(value: string) {
    this.currentStateElement.key = value;
  }
  public currentStateElement: CheckedElement = Object.assign(
    {},
    initialCheckedElement
  );
  public formControlClasses = {
    'form-control': true,
    required: false,
    'blue-border': false,
  };
  private skipClick: boolean = true;
  private currentStateStore: CheckedElement = Object.assign(
    {},
    this.currentStateElement
  );
  public elementKey$: Observable<string> = this.store.pipe(
    select(selectCheckedElement)
  );
  public elementType$: Observable<string> = this.store.pipe(
    select(selectElement)
  );
  public checkedElementStyles$: Observable<ElementStyles> = this.store.pipe(
    select(selectStylesCheckedElement)
  );

  constructor(
    private readonly store: Store,
    private readonly unsubscriberService: UnsubscriberService
  ) {}

  ngOnInit(): void {
    if (this.selectableSection) {
      this.elementType$
        .pipe(takeUntil(this.unsubscriberService.destroyer$))
        .subscribe((element) => {
          this.currentStateStore.element = element;
        });
      this.elementKey$
        .pipe(takeUntil(this.unsubscriberService.destroyer$))
        .subscribe((key) => {
          this.currentStateStore.key = key;
        });
      this.checkedElementStyles$
        .pipe(takeUntil(this.unsubscriberService.destroyer$))
        .subscribe((styles) => {
          if (
            this.element === this.currentStateStore.element &&
            this.currentStateStore.key === this.currentStateElement.key
          ) {
            this.currentStateElement.styles = styles;
            if (this.currentStateElement.styles.required === 'required') {
              this.formControlClasses.required = true;
            } else {
              this.formControlClasses.required = false;
            }
          }
        });
    }
  }

  get styles(): ElementStyles {
    return this.currentStateElement.styles;
  }

  get element(): string {
    return this.currentStateElement.element;
  }

  get key(): string {
    return this.currentStateElement.key;
  }

  @HostListener('window:click')
  clickOutOfForm(): void {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }
    this.formControlClasses['blue-border'] = false;
  }

  public clickOnFormControl(): void {
    if (!this.selectableSection) return;
    this.formControlClasses['blue-border'] = true;
    this.skipClick = true;
    this.store.dispatch(
      setAllAction({
        styles: this.styles,
        element: this.element,
        key: this.currentStateElement.key,
      })
    );
  }
}
