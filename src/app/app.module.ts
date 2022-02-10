import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { FormBuilderModule } from '../modules/form-builder/form-builder.module';
import { AuthFormModule } from 'src/modules/auth-form/auth-form.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthFormModule,
    BrowserModule,
    FormBuilderModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
