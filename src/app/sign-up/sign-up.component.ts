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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email;
  password;
  displayName;
 
  constructor(private af: AngularFire, private router: Router) {}
  
  createUser() {
    this.af.auth.createUser({ email: (this.email), password: (this.password)})
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid = user.uid;
        const itemObservable = this.af.database.object('user-data/' + uid );
        itemObservable.set({ displayName: (this.displayName), email: (this.email)});
        console.log(user)
        console.log("user created")
        this.router.navigate(['/app-home']); 
      } 
      else {
        console.log("no user")
      }
    });
  }
}