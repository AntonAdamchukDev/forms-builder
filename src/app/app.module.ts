import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormControlComponent } from './form-control/form-control.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StylingElementsComponent } from './styling-elements/styling-elements.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicalFormComponent } from './dynamical-form/dynamical-form.component';
import { CutTextPipe } from './pipes/cut-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormControlComponent,
    StylingElementsComponent,
    DynamicalFormComponent,
    CutTextPipe
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
