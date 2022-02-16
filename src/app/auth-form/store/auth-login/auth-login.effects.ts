import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as moment from 'moment';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
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
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: User) => {
      return this.authService.login(payload.email, payload.password).pipe(
        map((user) => {
          return new LogInSuccess({
            idToken: user.idToken,
            expiresIn: user.expiresIn,
          });
        }),
        catchError((error) => {
          return of(
            new LogInFailure({
              message:
                error.error.message ||
                'Internet connection is unstable or server is unavailavle!',
            })
          );
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    tap((authResult) => {
      const expiresAt = moment().add(authResult.expiresIn, 'second');
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      this.router.navigateByUrl('/forms-builder');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );
}
