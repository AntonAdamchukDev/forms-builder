import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormsBuilderRoutingModule } from './form-builder-routing.module';
import { SharedModule } from '../shared/shared.module';

import { reducers } from './store';
import { environment } from '../../environments/environment';
import { StylingElementsComponent } from './components/styling-elements/styling-elements.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { DynamicalFormComponent } from './components/dynamical-form/dynamical-form.component';
import { CutTextPipe } from './pipes/cut-text.pipe';
import { FormBuilderComponent } from './form-builder.component';
import { formsBuilderNode } from './store/constants/forms-builder-nodes';

@NgModule({
  declarations: [
    StylingElementsComponent,
    FormControlComponent,
    FormBuilderComponent,
    DynamicalFormComponent,
    CutTextPipe,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    FormsBuilderRoutingModule,
    MatExpansionModule,
    ReactiveFormsModule,
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forFeature(formsBuilderNode, reducers, {}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
