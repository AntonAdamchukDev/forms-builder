import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { DynamicalFormService } from '../../services/dynamical-form.service';
import { Values } from '../../interfaces/form-builder-interfaces';
import {
  CheckedElementStyles,
  ElementStyles,
} from '../../ngrx-store/element-styles/element-styles.reducer';
import { DragElement } from '../../ngrx-store/elements/elements.reducer';
import { selectElements } from '../../ngrx-store/elements/elements.selectors';
import { selectFormStyles } from '../../ngrx-store/form-styles/form-styles.selectors';
import { starterStyle } from '../../constants/form-builder-constants';
import { UnsubscriberService } from 'src/shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-dynamical-form',
  templateUrl: './dynamical-form.component.html',
  styleUrls: ['./dynamical-form.component.css'],
  providers: [DynamicalFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicalFormComponent implements OnInit {
  private elements$: Observable<DragElement[]> = this.store$.pipe(
    select(selectElements)
  );
  private styles$: Observable<ElementStyles> = this.store$.pipe(
    select(selectFormStyles)
  );
  public form!: FormGroup;
  public formElements!: DragElement[];
  public stylesForm: ElementStyles = starterStyle;
  constructor(
    private store$: Store<CheckedElementStyles>,
    private dynamicalForm: DynamicalFormService,
    private unsubscriber: UnsubscriberService
  ) {}
  formValues!: Values;
  ngOnInit(): void {
    this.styles$
      .pipe(takeUntil(this.unsubscriber.notifier))
      .subscribe((styles) => {
        this.stylesForm = styles;
      });
    this.elements$
      .pipe(takeUntil(this.unsubscriber.notifier))
      .subscribe((elements) => {
        this.formElements = elements;
        if (this.form) {
          this.formValues = this.form.value;
        }
        this.form = this.dynamicalForm.toFormGroup(this.formElements);
        this.form.patchValue(this.formValues);
      });
  }

  public message: String = '';
  public success: String = '';
  submitValues() {
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
