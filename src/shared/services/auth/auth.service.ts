import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';
import { setElementsAction } from 'src/modules/form-builder/ngrx-store/elements/elements.actions';
import { initialState } from 'src/modules/form-builder/ngrx-store/elements/elements.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl?: string;

  constructor(private http: HttpClient, private store$: Store) {}

  public login(
    email: string,
    password: string
  ): Observable<{ idToken: string; expiresIn: number; message: string }> {
    return this.http
      .post<{ idToken: string; expiresIn: number; message: string }>(
        '/api/login',
        { email, password }
      )
      .pipe(shareReplay());
  }

  public registrate(
    email: string,
    password: string
  ): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>('/api/registrate', { email, password })
      .pipe(shareReplay());
  }

  public logout(): void {
    this.store$.dispatch(new setElementsAction(initialState));
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ? expiration : '');
    return moment().isBefore(moment(expiresAt));
  }
}
