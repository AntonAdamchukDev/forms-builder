import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';
import { setElementsAction } from '../../../form-builder/store/elements/elements.actions';
import { initialState } from '../../../form-builder/store/elements/elements.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl?: string;

  constructor(private readonly httpClient: HttpClient, private store: Store) {}

  public login(
    email: string,
    password: string
  ): Observable<{ idToken: string; expiresIn: number; message: string }> {
    return this.httpClient
      .post<{ idToken: string; expiresIn: number; message: string }>(
        '/api/login',
        { email, password }
      )
      .pipe(shareReplay());
  }

  public signUp(
    email: string,
    password: string
  ): Observable<{ message: string }> {
    return this.httpClient
      .post<{ message: string }>('/api/registrate', { email, password })
      .pipe(shareReplay());
  }

  public logout(): void {
    this.store.dispatch(new setElementsAction(initialState));
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ? expiration : '');
    return moment().isBefore(moment(expiresAt));
  }
}
