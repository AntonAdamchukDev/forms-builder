import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as moment from 'moment';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SignInSuccessInformation } from '../interfaces/auth-interfaces';
import { SetIsLoading } from '../spinner/spinner.actions';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  User,
} from './auth-login.actions';

@Injectable()
export class AuthEffectsLogin {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  LogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogIn),
      switchMap((payload: User) => {
        return this.authService.login(payload.email, payload.password).pipe(
          map((user) => {
            return LogInSuccess({
              idToken: user.idToken,
              expiresIn: user.expiresIn,
            });
          }),
          catchError((error) => {
            return of(
              LogInFailure({
                message:
                  error.error.message ||
                  'Internet connection is unstable or server is unavailavle!',
              })
            );
          })
        );
      })
    )
  );

  LogInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogInSuccess),
      map((authResult: SignInSuccessInformation) => {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.router.navigateByUrl('/forms-builder');
        return SetIsLoading({ isLoading: false });
      })
    )
  );

  LogInFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE),
      map(() => {
        return SetIsLoading({ isLoading: false });
      })
    )
  );
}
