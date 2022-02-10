import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    StylingElementsComponent,
    FormControlComponent,
    FormBuilderComponent,
    DynamicalFormComponent,
    CutTextPipe
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [FormBuilderComponent]
})
export class FormBuilderModule {}
