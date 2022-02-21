import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DragElement } from '../store/elements/elements.reducer';

@Injectable({
  providedIn: 'root',
})
export class DynamicalFormService {
  toFormGroup(elements: DragElement[]): FormGroup {
    const group: any = {};
    elements.forEach((el) => {
      if (el.element !== 'button') group[el.key] = new FormControl();
    });
    return new FormGroup(group);
  }
}
