import { Component, OnInit } from '@angular/core';
import { RouterModule, 
  Routes, 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';
import {defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig,
  FirebaseAuth,
  FirebaseAuthState} from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

@Component({
  selector: 'signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  email;
  password;
  displayName;
 
  constructor(private af: AngularFire, private auth: FirebaseAuth, private router: Router) {}
  
  createUser() {
    this.af.auth.createUser({ email: (this.email), password: (this.password)})
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid = user.uid;
        const user_data_db = this.af.database.object('user-data/' + uid);
        user_data_db.set({ displayName: (this.displayName), email: (this.email)});
        console.log(user + "created")
        this.router.navigate(['/home']); 
      } 
      else {
        console.log("no user")
        this.router.navigate(['/welcomescreen']);
      }
    });
  }

  welcomeScreen() {
    this.router.navigate(['/welcomescreen']); 
  }
}
