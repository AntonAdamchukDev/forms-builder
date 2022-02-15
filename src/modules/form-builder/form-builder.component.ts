import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { selectElement } from './ngrx-store/element-styles/element-styles.selectors';
import { DragElement } from './ngrx-store/elements/elements.reducer';
import { selectElements } from './ngrx-store/elements/elements.selectors';
import { setElementsAction } from './ngrx-store/elements/elements.actions';
import { UnsubscriberService } from 'src/shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
  private element$: Observable<string> = this.store$.pipe(
    select(selectElement)
  );
  private elements$: Observable<DragElement[]> = this.store$.pipe(
    select(selectElements)
  );
  public elements: DragElement[] = [
    { element: 'input', key: 0 },
    { element: 'textarea', key: 1 },
    { element: 'button', key: 2 },
    { element: 'check', key: 3 },
    { element: 'select', key: 4 },
  ];
  public formElements!: DragElement[];
  private counter: number = 5;
  public stylingElement = '';
  public formG: FormGroup = new FormGroup({
    0: new FormControl(''),
    1: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl(''),
  });

  constructor(
    private store$: Store,
    private unsubscriber: UnsubscriberService
  ) {}

  ngOnInit(): void {
    this.element$
      .pipe(takeUntil(this.unsubscriber.notifier))
      .subscribe((element) => {
        this.stylingElement = element;
      });
    this.elements$
      .pipe(takeUntil(this.unsubscriber.notifier))
      .subscribe((elements) => {
        this.formElements = Object.assign([], elements);
      });
  }

  public drop(event: CdkDragDrop<{ element: string; key: number }[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.store$.dispatch(
        new setElementsAction({ elements: this.formElements })
      );
    } else {
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        if (this.formElements[0].element === '') {
          this.formElements.splice(0, 1);
        }
        this.formElements.splice(event.currentIndex, 0, {
          element: event.previousContainer.data[event.previousIndex].element,
          key: this.counter++,
        });
        this.store$.dispatch(
          new setElementsAction({ elements: this.formElements })
        );
        return;
      }
      this.formElements.splice(event.previousIndex, 1);
      if (this.formElements.length === 0) {
        this.formElements.push({ element: '', key: -1 });
      }
      this.store$.dispatch(
        new setElementsAction({ elements: this.formElements })
      );
    }
  }
}
