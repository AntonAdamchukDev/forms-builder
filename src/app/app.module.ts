import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/interceptor.service';
import { AuthFormModule } from './auth-form/auth-form.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    AppRoutingModule,
    AuthFormModule,
    BrowserModule,
    HomePageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
