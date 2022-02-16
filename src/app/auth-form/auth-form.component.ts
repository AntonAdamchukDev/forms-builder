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
import { UnsubscriberService } from '../shared/services/unsubscriber/unsubscriber.service';
import {
  InputDefault,
  InputEmail,
  InputPassword,
} from '../shared/classes/inputClasses';
import { Store } from '@ngrx/store';
import { LogIn } from './store/auth-login/auth-login.actions';
import { selectSignInInfo } from './store/auth-login/auth-login.selectors';
import { Registration } from './store/auth-signUp/auth-registration.action';
import { selectRegistrationInfo } from './store/auth-signUp/auth-registration.selectors';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  public url!: string;
  public form: FormGroup;
  public error: String = '';
  public fields: InputDefault[] = [
    new InputEmail('Enter email:'),
    new InputPassword('Enter password:'),
  ];
  private _visibility = new BehaviorSubject<boolean>(false);
  public readonly visibility$ = this._visibility.asObservable();
  private messageSingIn$ = this.store.select(selectSignInInfo);
  private messageRegistration$ = this.store.select(selectRegistrationInfo);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store,
    private readonly host: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly unsubscriberService: UnsubscriberService
  ) {
    this.url = router.url.slice(1);
    if (this.url === 'registration') {
      this.host.nativeElement.style.setProperty(
        '--base-form-color',
        'rgb(245, 183, 68)'
      );
      this.host.nativeElement.style.setProperty(
        '--form-background-image',
        `url('../../assets/reg_background.jpg')`
      );
      this.fields.push(new InputPassword('Password confirmation:'));
      this.form = this.formBuilder.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
      });
    } else {
      this.host.nativeElement.style.setProperty(
        '--base-form-color',
        'rgb(102, 173, 240)'
      );

      this.host.nativeElement.style.setProperty(
        '--form-background-image',
        `url('../../assets/auth_background.jpg')`
      );
      this.form = this.formBuilder.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
      });
    }
    merge(this.messageSingIn$, this.messageRegistration$)
      .pipe(
        tap((info) => {
          if (info.message) {
            this.error = new String(info.message || 'Something went wrong :(');
            changeDetectorRef.detectChanges();
            this.hide();
          }
        }),
        takeUntil(unsubscriberService.notifier$)
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
      this.store.dispatch(
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
      this.store.dispatch(
        new Registration({ email: val.email0, password: val.password1 })
      );
    } else {
      this.error = new String(
        'Please fill all fields in form, check correctness of the email and check passwords for equality!'
      );
    }
  }
}
