import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { validateEmail } from './utils/emailValidation';
import {
  InputDefault,
  InputEmail,
  InputPassword,
} from '../shared/classes/inputClasses';
import { Store } from '@ngrx/store';
import { LogIn, SetMessage } from './store/auth-login/auth-login.actions';
import { selectSignInMessage } from './store/auth-login/auth-login.selectors';
import { Registration } from './store/auth-signUp/auth-registration.action';
import { selectRegistrationMessage } from './store/auth-signUp/auth-registration.selectors';
import { selectSpinnerVisibility } from './store/spinner/spinner.selectors';
import { SetVisibility } from './store/spinner/spinner.actions';

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
  public formStyle = {
    form: {
      'registration-form': false,
      'authorization-form': false,
    },
    background: {
      'authorization-background': false,
      'registration-background': false,
    },
  };
  public visibility$ = this.store.select(selectSpinnerVisibility);
  private messageSingIn$ = this.store.select(selectSignInMessage);
  private messageRegistration$ = this.store.select(selectRegistrationMessage);
  public message$ = merge(this.messageSingIn$, this.messageRegistration$);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.url = router.url.slice(1);
    if (this.url === 'registration') {
      this.formStyle.form['registration-form'] = true;
      this.formStyle.background['registration-background'] = true;
      this.fields.push(new InputPassword('Password confirmation:'));
      this.form = this.formBuilder.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
      });
    } else {
      this.formStyle.form['authorization-form'] = true;
      this.formStyle.background['authorization-background'] = true;
      this.form = this.formBuilder.group({
        email0: ['', Validators.required],
        password1: ['', Validators.required],
      });
    }
  }

  public login(): void {
    const val = this.form.value;
    if (val.email0 && val.password1 && validateEmail(val.email0)) {
      this.store.dispatch(SetVisibility({ visibility: true }));
      this.store.dispatch(
        LogIn({ email: val.email0, password: val.password1 })
      );
    } else {
      this.store.dispatch(
        SetMessage({
          message: new String(
            'Please fill all fields in form and check correctness of the email!'
          ),
        })
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
      this.store.dispatch(SetVisibility({ visibility: true }));
      this.store.dispatch(
        Registration({ email: val.email0, password: val.password1 })
      );
    } else {
      this.store.dispatch(
        SetMessage({
          message: new String(
            'Please fill all fields in form, check correctness of the email and check passwords for equality!'
          ),
        })
      );
    }
  }
}
