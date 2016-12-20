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
  data = {};

  constructor(public af: AngularFire, public router: Router) { }

  login() {
    this.af.auth.login(this.data)
    console.log(this.data)
    this.router.navigate(['/home']);
  }

  logout() {
    this.af.auth.logout
    console.log(this.data)
  }

}
