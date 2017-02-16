import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule, 
  Routes, 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';
import { defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig } from 'angularfire2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  //set user input properties
  email;
  password;

  //pass in AngularFire and Router via direct injection
  constructor(public af: AngularFire, private router: Router) {}

  login() {
    //login in existing user via firbase auth with email & password
    this.af.auth.login({ email: (this.email), password: (this.password)},
    {provider: AuthProviders.Password, method: AuthMethods.Password})
    //route existing user to home screen
    this.router.navigate(['/home']);
  }

  //route user to welcome screen
  welcomeScreen() {
    this.router.navigate(['/welcomescreen'])
  }

}
