import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { validateEmail } from './utils/emailValidation';
import {
  InputDefault,
  InputEmail,
  InputPassword,
} from '../shared/classes/inputClasses';
import { LogIn, SetMessage } from './store/auth-login/auth-login.actions';
import { selectSignInMessage } from './store/auth-login/auth-login.selectors';
import { signUp } from './store/auth-signUp/auth-registration.action';
import { selectRegistrationMessage } from './store/auth-signUp/auth-registration.selectors';
import { selectIsLoading } from './store/spinner/spinner.selectors';
import { SetIsLoading } from './store/spinner/spinner.actions';
import { initialAuthFormStyles } from './constants/auth-form-constants';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  public currentUrl!: string;
  public authForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  public authFormFields: InputDefault[] = [
    new InputEmail('Enter email:', 'email'),
    new InputPassword('Enter password:', 'password'),
  ];
  public authFormStyles = Object.assign({},initialAuthFormStyles);
  public isLoading$ = this.store.select(selectIsLoading);
  private messageSignIn$ = this.store.select(selectSignInMessage);
  private messageRegistration$ = this.store.select(selectRegistrationMessage);
  public message$ = merge(this.messageSignIn$, this.messageRegistration$);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.currentUrl = router.url.slice(1);
    if (this.currentUrl === 'registration') {
      this.authFormStyles.form['authorization-form'] = false;
      this.authFormStyles.background['authorization-background'] = false;
      this.authFormStyles.form['registration-form'] = true;
      this.authFormStyles.background['registration-background'] = true;
      this.authFormFields.push(
        new InputPassword('Password confirmation:', 'passwordConfirm')
      );
      this.authForm.addControl(
        'passwordConfirm',
        new FormControl('', Validators.required)
      );
    } else {
      this.authFormStyles.form['authorization-form'] = true;
      this.authFormStyles.background['authorization-background'] = true;
    }
  }

  public login(): void {
    const formValues = this.authForm.value;
    if (
      formValues.email &&
      formValues.password &&
      validateEmail(formValues.email)
    ) {
      this.store.dispatch(SetIsLoading({ isLoading: true }));
      this.store.dispatch(
        LogIn({ email: formValues.email, password: formValues.password })
      );
    } else {
      this.store.dispatch(
        SetMessage({
          message:
            'Please fill all fields in form and check correctness of the email!',
        })
      );
    }
  }

  public signUp(): void {
    const formValues = this.authForm.value;
    if (
      formValues.email &&
      formValues.password &&
      formValues.passwordConfirm &&
      validateEmail(formValues.email) &&
      formValues.password === formValues.passwordConfirm
    ) {
      this.store.dispatch(SetIsLoading({ isLoading: true }));
      this.store.dispatch(
        signUp({ email: formValues.email, password: formValues.password })
      );
    } else {
      this.store.dispatch(
        SetMessage({
          message:
            'Please fill all fields in form, check correctness of the email and check passwords for equality!',
        })
      );
    }
  }
}
