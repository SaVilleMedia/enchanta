import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../state/auth/auth.actions';
import { ILoginCredentials } from '../api';

@Component({
  selector: 'svm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private _store: Store) {}

  handleLogin() {
    console.log(this.loginForm.value);
    this._store.dispatch(new Login(this.loginForm.value as ILoginCredentials));
  }
}
