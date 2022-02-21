import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { DynamicalFormService } from '../../services/dynamical-form.service';
import { Values } from '../../interfaces/form-builder-interfaces';
import {
  CheckedElement,
  ElementStyles,
} from '../../store/element-styles/element-styles.reducer';
import { DragElement } from '../../store/elements/elements.reducer';
import { selectElements } from '../../store/elements/elements.selectors';
import { selectFormStyles } from '../../store/form-styles/form-styles.selectors';
import { initialStyle } from '../../constants/form-builder-constants';
import { UnsubscriberService } from '../../../shared/services/unsubscriber/unsubscriber.service';
import { PopUp } from 'src/app/shared/interfaces/shared-interfaces';
import { initialPopUp } from 'src/app/shared/constants/shared-constants';

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
  public formStyles: ElementStyles = initialStyle;
  public popUp: PopUp = initialPopUp;
  private storeFormElements$: Observable<DragElement[]> = this.store.pipe(
    select(selectElements)
  );
  private storeFormStyles$: Observable<ElementStyles> = this.store.pipe(
    select(selectFormStyles)
  );

  constructor(
    private readonly store: Store<CheckedElement>,
    private readonly dynamicalFormService: DynamicalFormService,
    private readonly unsubscriberService: UnsubscriberService
  ) {}

  ngOnInit(): void {
    this.storeFormStyles$
      .pipe(takeUntil(this.unsubscriberService.destroyer$))
      .subscribe((styles) => {
        this.formStyles = styles;
      });
    this.storeFormElements$
      .pipe(takeUntil(this.unsubscriberService.destroyer$))
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
      this.popUp.text = new String(
        'Some information at the form is invalid!\nCheck if all required fields are filled with value!'
      );
      this.popUp.isSuccess = false;
    } else {
      this.popUp.isSuccess = true;
      this.popUp.text = 'Information:\n';
      for (const key in this.form.value) {
        this.popUp.text = this.popUp.text + this.form.value[key] + '\n';
      }
      this.popUp.text = this.popUp.text + '. Succesfully sended!';
      this.popUp.text = new String(this.popUp.text);
    }
  }
}
