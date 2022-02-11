import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { validateEmail } from './utils/emailValidation';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UnsubscriberService } from 'src/shared/services/unsubscriber/unsubscriber.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  private _visibility = new BehaviorSubject<boolean>(false);
  public error: String = '';
  public url!: string;
  public readonly visibility$ = this._visibility.asObservable();
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private unsubscriber: UnsubscriberService
  ) {
    this.url = router.url.slice(1);
    if (this.url === 'registration') {
      document.documentElement.style.setProperty(
        '--base-form-color',
        'rgb(245, 183, 68)'
      );
    } else {
      document.documentElement.style.setProperty(
        '--base-form-color',
        'rgb(102, 173, 240)'
      );
    }
    if (this.url === 'login') {
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      });
    }
  }

  show() {
    this._visibility.next(true);
  }

  hide() {
    this._visibility.next(false);
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password && validateEmail(val.email)) {
      this.show();
      this.authService
        .login(val.email, val.password)
        .pipe(takeUntil(this.unsubscriber.notifier))
        .subscribe(
          () => {
            this.hide();
            this.router.navigateByUrl('/forms-builder');
          },
          (error) => {
            this.hide();
            this.error = new String('Internet connection is unstable or server is unavailavle!');
          }
        );
    } else {
      this.error = new String(
        'Please fill all fields in form and check correctness of the email!'
      );
    }
  }

  registrate() {
    const val = this.form.value;
    if (
      val.email &&
      val.password &&
      val.passwordConfirm &&
      validateEmail(val.email) &&
      val.password === val.passwordConfirm
    ) {
      this.show();
      this.authService
        .registrate(val.email, val.password)
        .pipe(takeUntil(this.unsubscriber.notifier))
        .subscribe(
          () => {
            this.router.navigateByUrl('/login');
            this.hide();
          },
          (error) => {
            this.hide();
            this.error = new String(error.error.message || 'Internet connection is unstable or server is unavailavle!');
          }
        );
    } else {
      this.error = new String(
        'Please fill all fields in form, check correctness of the email and check passwords for equality!'
      );
    }
  }
}
