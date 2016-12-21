import { Component, OnInit } from '@angular/core';
import { RouterModule, 
  Routes, 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';
import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email;
  password;

  constructor(public af: AngularFire, private router: Router) {}

  login() {
    this.af.auth.login({ email: (this.email), password: (this.password)},
    {provider: AuthProviders.Password, method: AuthMethods.Password})
    this.router.navigate(['/home']);
  }

  logout() {
    this.af.auth.logout
  }

  welcomeScreen() {
    this.router.navigate(['/welcomescreen'])
  }

}
