import { ElementStyles } from '../store/element-styles/element-styles.reducer';
import { DragElement } from '../store/elements/elements.reducer';

export const starterStyle: ElementStyles = {
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

export const draggableElements: DragElement[] = [
  { element: 'input', key: 0 },
  { element: 'textarea', key: 1 },
  { element: 'button', key: 2 },
  { element: 'check', key: 3 },
  { element: 'select', key: 4 },
];
