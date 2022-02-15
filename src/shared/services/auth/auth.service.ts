import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl?: string;
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ? expiration : '');
    return moment().isBefore(moment(expiresAt));
  }
}
