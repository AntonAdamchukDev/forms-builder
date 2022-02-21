import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopUpComponent } from './components/pop-up/pop-up.component';

@NgModule({
  declarations: [PopUpComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PopUpComponent],
})
export class SharedModule {}
