import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { stylesSetAction } from '../../store/element-styles/element-styles.actions';
import {
  CheckedElement,
  ElementStyles,
} from '../../store/element-styles/element-styles.reducer';
import { selectStylesCheckedElement } from '../../store/element-styles/element-styles.selectors';
import { stylesFormSetAction } from '../../store/form-styles/form-styles.actions';
import { stylesControlGroup } from '../../constants/form-builder-constants';
import { UnsubscriberService } from '../../../shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-styling-elements',
  templateUrl: './styling-elements.component.html',
  styleUrls: ['./styling-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylingElementsComponent implements OnChanges {
  @Input() title: string = '';
  @Input() elementType!: string | null;
  public stylesControlGroup: FormGroup = stylesControlGroup;
  public checkedElementStyles$: Observable<ElementStyles> = this.store.pipe(
    select(selectStylesCheckedElement)
  );

  constructor(
    private store: Store<CheckedElement>,
    private unsubscriberService: UnsubscriberService
  ) {}

  ngOnChanges(): void {
    if (this.elementType !== 'form') {
      this.checkedElementStyles$
        .pipe(takeUntil(this.unsubscriberService.destroyer$))
        .subscribe((styles) => {
          this.stylesControlGroup.setValue(styles);
        });
    }
  }

  public changeStyles(): void {
    if (this.elementType === 'form') {
      this.store.dispatch(
        stylesFormSetAction({ styles: this.stylesControlGroup.value })
      );
      return;
    }
    this.store.dispatch(
      stylesSetAction({ styles: this.stylesControlGroup.value })
    );
  }
}
