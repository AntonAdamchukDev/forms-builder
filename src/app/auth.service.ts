import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { map, shareReplay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public redirectUrl?:string;
    private isLogged:boolean = false;

    constructor(private http: HttpClient) {

    }

    public login(email:string, password:string ) {
        return this.http.post('/api/login', {email, password})
            .pipe(
              map(val=>this.setSession(val)),
              shareReplay()
            );
    }

    public registrate(email:string, password:string){
        return this.http.post('/api/registrate', {email, password})
            .pipe(
              shareReplay()
            );
    }
          
    private setSession(authResult:any) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    public logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration?expiration:'');
        return moment().isBefore(moment(expiresAt));
    }

    public isLoggedOut() {
        return !this.isLoggedIn();
    }

}