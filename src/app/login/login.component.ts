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

  email;
  password;

  constructor(public af: AngularFire, private router: Router) {}

   ngOnInit() {
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.router.navigate(['/home']); 
      }
    })
  }

  login() {
    this.af.auth.login({ email: (this.email), password: (this.password)},
    {provider: AuthProviders.Password, method: AuthMethods.Password})
    this.router.navigate(['/home']);
  }

  welcomeScreen() {
    this.router.navigate(['/welcomescreen'])
  }

  forgotpassword() {
    this.router.navigate(['/forgotpassword'])
  }

}
