import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { DynamicalFormService } from '../../services/dynamical-form.service';
import { Values } from '../../interfaces/form-builder-interfaces';
import {
  CheckedElementStyles,
  ElementStyles,
} from '../../store/element-styles/element-styles.reducer';
import { DragElement } from '../../store/elements/elements.reducer';
import { selectElements } from '../../store/elements/elements.selectors';
import { selectFormStyles } from '../../store/form-styles/form-styles.selectors';
import { starterStyle } from '../../constants/form-builder-constants';
import { UnsubscriberService } from '../../../shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-dynamical-form',
  templateUrl: './dynamical-form.component.html',
  styleUrls: ['./dynamical-form.component.scss'],
  providers: [DynamicalFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicalFormComponent implements OnInit {
  public form!: FormGroup;
  public formValues!: Values;
  public formElements!: DragElement[];
  public stylesForm: ElementStyles = starterStyle;
  public message: String = '';
  public success: String = '';
  private elements$: Observable<DragElement[]> = this.store$.pipe(
    select(selectElements)
  );
  private styles$: Observable<ElementStyles> = this.store$.pipe(
    select(selectFormStyles)
  );

  constructor(
    private readonly store$: Store<CheckedElementStyles>,
    private readonly dynamicalFormService: DynamicalFormService,
    private readonly unsubscriberService: UnsubscriberService
  ) {}

  ngOnInit(): void {
    this.styles$
      .pipe(takeUntil(this.unsubscriberService.notifier$))
      .subscribe((styles) => {
        this.stylesForm = styles;
      });
    this.elements$
      .pipe(takeUntil(this.unsubscriberService.notifier$))
      .subscribe((elements) => {
        this.formElements = elements;
        if (this.form) {
          this.formValues = this.form.value;
        }
        this.form = this.dynamicalFormService.toFormGroup(this.formElements);
        this.form.patchValue(this.formValues);
      });
  }

  public submitValues(): void {
    if (this.form.invalid) {
      this.message = new String(
        'Some information at the form is invalid!\nCheck if all required fields are filled with value!'
      );
      this.success = new String('Error');
    } else {
      this.success = new String('Success');
      this.message = 'Information:\n';
      for (const key in this.form.value) {
        this.message = this.message + this.form.value[key] + '\n';
      }
      this.message = this.message + '. Succesfully sended!';
      this.message = new String(this.message);
    }
  }
}
