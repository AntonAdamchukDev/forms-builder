import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './ngrx-store';
import { environment } from 'src/environments/environment';
import { StylingElementsComponent } from './components/styling-elements/styling-elements.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { DynamicalFormComponent } from './components/dynamical-form/dynamical-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CutTextPipe } from './pipes/cut-text.pipe';
import { FormBuilderComponent } from './form-builder.component';
import { SharedModule } from 'src/shared/shared.module';
import { formsBuilderNode } from './ngrx-store/constants/forms-builder-nodes';
import { FormsBuilderRoutingModule } from './form-builder-routing.module';

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
    // EffectsModule.forFeature(),
    StoreModule.forFeature(formsBuilderNode, reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [FormBuilderComponent],
})
export class FormBuilderModule {}
