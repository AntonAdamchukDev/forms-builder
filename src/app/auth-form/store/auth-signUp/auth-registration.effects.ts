import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../auth-login/auth-login.actions';
import { SetVisibility } from '../spinner/spinner.actions';
import {
  AuthActionTypes,
  Registration,
  RegistrationFailure,
  RegistrationSuccess,
} from './auth-registration.action';

@Injectable()
export class AuthEffectsRegistration {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  Registration: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION),
    switchMap((payload: User) => {
      return this.authService.signUp(payload.email, payload.password).pipe(
        map(() => {
          return RegistrationSuccess();
        }),
        catchError((error) => {
          return of(
            RegistrationFailure({
              message:
                error.error.message ||
                'Internet connection is unstable or server is unavailavle!',
            })
          );
        })
      );
    })
  );

  @Effect()
  RegistrationSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_SUCCESS),
    map(() => {
      this.router.navigateByUrl('/login');
      return SetVisibility({ visibility: false });
    })
  );

  @Effect()
  RegistrationFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_FAILURE),
    map(() => {
      return SetVisibility({ visibility: false });
    })
  );
}
