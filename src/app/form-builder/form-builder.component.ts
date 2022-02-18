import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { selectElement } from './store/element-styles/element-styles.selectors';
import { DragElement } from './store/elements/elements.reducer';
import { selectElements } from './store/elements/elements.selectors';
import { setElementsAction } from './store/elements/elements.actions';
import { UnsubscriberService } from '../shared/services/unsubscriber/unsubscriber.service';
import { draggableElements } from './constants/form-builder-constants';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
  public formElements!: DragElement[];
  public elements: DragElement[] = draggableElements;
  public formGroupDragElements: FormGroup = new FormGroup({
    input: new FormControl(''),
    textarea: new FormControl(''),
    check: new FormControl(''),
    select: new FormControl(''),
  });
  public element$: Observable<string> = this.store.pipe(select(selectElement));
  private elements$: Observable<DragElement[]> = this.store.pipe(
    select(selectElements)
  );

  constructor(
    private store: Store,
    private unsubscriberService: UnsubscriberService
  ) {}

  ngOnInit(): void {
    this.elements$
      .pipe(takeUntil(this.unsubscriberService.notifier$))
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
      this.store.dispatch(setElementsAction({ elements: this.formElements }));
    } else {
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        if (this.formElements[0].element === '') {
          this.formElements.splice(0, 1);
        }
        this.formElements.splice(event.currentIndex, 0, {
          element: event.previousContainer.data[event.previousIndex].element,
          key: Date.now(),
        });
        this.store.dispatch(setElementsAction({ elements: this.formElements }));
        return;
      }
      this.formElements.splice(event.previousIndex, 1);
      if (this.formElements.length === 0) {
        this.formElements.push({ element: '', key: -1 });
      }
      this.store.dispatch(setElementsAction({ elements: this.formElements }));
    }
  }
}
