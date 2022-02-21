import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { clearElementsAction } from '../../../form-builder/store/elements/elements.actions';
import * as moment from 'moment';
import { elementSetAction } from 'src/app/form-builder/store/element-styles/element-styles.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
      .post<{ message: string }>('/api/signUp', { email, password })
      .pipe(shareReplay());
  }

  public logout(): void {
    this.store.dispatch(clearElementsAction());
    this.store.dispatch(elementSetAction({ element: '' }));
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ? expiration : '');
    return moment().isBefore(moment(expiresAt));
  }
}
