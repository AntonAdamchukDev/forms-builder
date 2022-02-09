import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLogged:boolean=false;
  constructor(private authService:AuthService,private router:Router, private http: HttpClient){
  }
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url:string = state.url;
    return this.http.get<{authorized:boolean,error?:Error}>('/api/check').pipe(map(
      (data)=>{
        if(!data.authorized){
          this.router.navigate(['/login']);
          return false;
        }
        return this.authService.isLoggedIn();
      }
    ));
  }
}
