import { FormControl, FormGroup } from '@angular/forms';
import {
  CheckedElement,
  ElementStyles,
} from '../store/element-styles/element-styles.reducer';
import { DragElement } from '../store/elements/elements.reducer';

export const initialStyle: ElementStyles = {
  height: '',
  width: '',
  'border-width': '',
  'border-color': '',
  'border-style': '',
  'border-radius': '',
  'font-size': '',
  'font-weight': '',
  color: '',
  placeholder: '',
  required: '',
};

export const initialCheckedElement: CheckedElement = {
  styles: initialStyle,
  element: '',
  key: '',
};

export const draggableElements: DragElement[] = [
  { element: 'input', key: '0' },
  { element: 'textarea', key: '1' },
  { element: 'button', key: '2' },
  { element: 'check', key: '3' },
  { element: 'select', key: '4' },
];

export const formGroupDragableElements: FormGroup = new FormGroup({
  input: new FormControl(''),
  textarea: new FormControl(''),
  check: new FormControl(''),
  select: new FormControl(''),
});

export const stylesControlGroup: FormGroup = new FormGroup({
  height: new FormControl(''),
  width: new FormControl(''),
  'border-width': new FormControl(''),
  'border-color': new FormControl(''),
  'border-style': new FormControl(''),
  'border-radius': new FormControl(''),
  'font-size': new FormControl(''),
  'font-weight': new FormControl(''),
  color: new FormControl(''),
  required: new FormControl(''),
  placeholder: new FormControl(''),
});
