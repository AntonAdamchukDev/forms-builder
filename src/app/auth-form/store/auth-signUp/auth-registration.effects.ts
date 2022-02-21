import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../auth-login/auth-login.actions';
import { SetIsLoading } from '../spinner/spinner.actions';
import {
  signUp,
  signUpFailure,
  signUpSuccess,
} from './auth-registration.action';

@Injectable()
export class AuthEffectsRegistration {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap((payload: User) => {
        return this.authService.signUp(payload.email, payload.password).pipe(
          map(() => {
            return signUpSuccess();
          }),
          catchError((error) => {
            return of(
              signUpFailure({
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

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpSuccess),
      map(() => {
        this.router.navigateByUrl('/login');
        return SetIsLoading({ isLoading: false });
      })
    )
  );

  signUpFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpFailure),
      map(() => {
        return SetIsLoading({ isLoading: false });
      })
    )
  );
}
