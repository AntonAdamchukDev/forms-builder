import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnDestroy{
    private _visibility = new BehaviorSubject<boolean>(false);
    private notifier = new Subject();
    public url!:string;
    public readonly visibility$ = this._visibility.asObservable();
    public formInfo = {
        email: '',
        password: '',
        passwordConfirm: '',
    }
    set email(value:string){
        this.formInfo.email = value;
    }
    set password(value:string){
        this.formInfo.password = value;
    }
    set passwordConfirm(value:string){
        this.formInfo.passwordConfirm = value;
    }
    constructor( private authService: AuthService, 
                 private router: Router) {
        this.url=router.url.slice(1);
        if(this.url==='registration'){
            document.documentElement.style.setProperty('--base-form-color','rgb(245, 183, 68)');
        } else {
            document.documentElement.style.setProperty('--base-form-color','rgb(102, 173, 240)');
        }
    }

    ngOnDestroy(): void {
        this.notifier.next('');
        this.notifier.complete()
    }

    show() {
        this._visibility.next(true);
    }

    hide() {
        this._visibility.next(false);
    }
    login() {
        if (this.formInfo.email && this.formInfo.password) {
            this.show()
            this.authService.login(this.formInfo.email, this.formInfo.password).pipe(takeUntil(this.notifier))
                .subscribe(
                    () => {
                        this.hide()
                        this.router.navigateByUrl('/forms-builder');
                    },
                    (error)=>{
                        this.hide();
                        alert(error.error.message)
                    }
                );
        } else {
            alert("Please fill all fields in form!")
        }
    }   

    registrate(){
        if((this.formInfo.email && this.formInfo.password && this.formInfo.passwordConfirm)
        &&(this.formInfo.password===this.formInfo.passwordConfirm)){
            this.show()
            this.authService.registrate(this.formInfo.email, this.formInfo.password).pipe(takeUntil(this.notifier))
                .subscribe(
                    () => {
                        this.router.navigateByUrl('/login');
                        this.hide();
                    },
                    (error)=>{
                        this.hide();
                        alert(error.error.message)
                    }
                );
        } else {
            alert("Please fill all fields in form and check passwords for equality!")
        }
    }
    
}
