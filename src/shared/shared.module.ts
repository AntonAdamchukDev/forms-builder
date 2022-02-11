import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopUpComponent } from 'src/shared/components/pop-up/pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PopUpComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PopUpComponent],
})
export class SharedModule {}
