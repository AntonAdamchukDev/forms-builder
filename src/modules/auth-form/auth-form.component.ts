import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, merge, takeUntil, tap } from 'rxjs';
import { validateEmail } from './utils/emailValidation';
import { UnsubscriberService } from 'src/shared/services/unsubscriber/unsubscriber.service';
import {
  InputDefault,
  InputEmail,
  InputPassword,
} from 'src/shared/classes/inputClasses';
import { Store } from '@ngrx/store';
import { LogIn } from './ngrx-store/auth-login/auth-login.actions';
import { selectSignInInfo } from './ngrx-store/auth-login/auth-login.selectors';
import { Registration } from './ngrx-store/auth-register/auth-registration.action';
import { selectRegistrationInfo } from './ngrx-store/auth-register/auth-registration.selectors';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  private _visibility = new BehaviorSubject<boolean>(false);
  public error: String = '';
  public fields: InputDefault[] = [
    new InputEmail('Enter email:'),
    new InputPassword('Enter password:'),
  ];
  public url!: string;
  public readonly visibility$ = this._visibility.asObservable();
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private unsubscriber: UnsubscriberService,
    private store$: Store,
    private host: ElementRef<HTMLElement>,
    private detector: ChangeDetectorRef
  ) {
    this.url = router.url.slice(1);
    if (this.url === 'registration') {
      this.host.nativeElement.style.setProperty(
        '--base-form-color',
        'rgb(245, 183, 68)'
      );
      this.fields.push(new InputPassword('Password confirmation:'));
      this.form = this.fb.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
      });
    } else {
      this.host.nativeElement.style.setProperty(
        '--base-form-color',
        'rgb(102, 173, 240)'
      );
      this.form = this.fb.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
      });
    }
    let messageSingIn$ = this.store$.select(selectSignInInfo);
    let messageRegistration$ = this.store$.select(selectRegistrationInfo);
    merge(messageSingIn$, messageRegistration$)
      .pipe(
        tap((info) => {
          if (info.message) {
            this.error = new String(info.message || 'Something went wrong :(');
            detector.detectChanges();
            this.hide();
          }
        }),
        takeUntil(unsubscriber.notifier)
      )
      .subscribe();
  }

  private show(): void {
    this._visibility.next(true);
  }

  private hide(): void {
    this._visibility.next(false);
  }

  public login(): void {
    const val = this.form.value;
    if (val.email0 && val.password1 && validateEmail(val.email0)) {
      this.show();
      this.store$.dispatch(
        new LogIn({ email: val.email0, password: val.password1 })
      );
    } else {
      this.error = new String(
        'Please fill all fields in form and check correctness of the email!'
      );
    }
  }

  public registrate(): void {
    const val = this.form.value;
    if (
      val.email0 &&
      val.password1 &&
      val.password2 &&
      validateEmail(val.email0) &&
      val.password1 === val.password2
    ) {
      this.show();
      this.store$.dispatch(
        new Registration({ email: val.email0, password: val.password1 })
      );
    } else {
      this.error = new String(
        'Please fill all fields in form, check correctness of the email and check passwords for equality!'
      );
    }
  }
}
