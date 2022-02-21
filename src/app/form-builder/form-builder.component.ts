import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { selectElement } from './store/element-styles/element-styles.selectors';
import { DragElement } from './store/elements/elements.reducer';
import { selectElements } from './store/elements/elements.selectors';
import { setElementsAction } from './store/elements/elements.actions';
import { UnsubscriberService } from '../shared/services/unsubscriber/unsubscriber.service';
import {
  draggableElements,
  formGroupDragableElements,
} from './constants/form-builder-constants';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
  public draggableElements: DragElement[] = draggableElements;
  public draggedElements!: DragElement[];
  public formGroupDragableElements: FormGroup = formGroupDragableElements;
  public checkedElement$: Observable<string> = this.store.pipe(
    select(selectElement)
  );
  private storeDraggedElements$: Observable<DragElement[]> = this.store.pipe(
    select(selectElements)
  );

  constructor(
    private store: Store,
    private unsubscriberService: UnsubscriberService
  ) {}

  ngOnInit(): void {
    this.storeDraggedElements$
      .pipe(takeUntil(this.unsubscriberService.destroyer$))
      .subscribe((elements) => {
        this.draggedElements = Object.assign([], elements);
      });
  }

  public drop(event: CdkDragDrop<{ element: string; key: string }[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.store.dispatch(
        setElementsAction({ elements: this.draggedElements })
      );
    } else {
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        if (this.draggedElements[0].element === '') {
          this.draggedElements.splice(0, 1);
        }
        this.draggedElements.splice(event.currentIndex, 0, {
          element: event.previousContainer.data[event.previousIndex].element,
          key: String(Date.now()),
        });
        this.store.dispatch(
          setElementsAction({ elements: this.draggedElements })
        );
        return;
      }
      this.draggedElements.splice(event.previousIndex, 1);
      if (this.draggedElements.length === 0) {
        this.draggedElements.push({ element: '', key: '-1' });
      }
      this.store.dispatch(
        setElementsAction({ elements: this.draggedElements })
      );
    }
  }
}
