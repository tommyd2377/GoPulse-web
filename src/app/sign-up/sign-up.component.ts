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

  //set user input properties
  email;
  password;
  displayName;
 
  constructor(private af: AngularFire, private auth: FirebaseAuth, private router: Router) {}
  
  createUser() {
    //create user with firebase auth method
    this.af.auth.createUser({ email: (this.email), password: (this.password)})
    //subscribe and retrieve user credentials
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid = user.uid;
        const itemObservable = this.af.database.object('user-data/' + uid );
        //create user record in firebase database
        itemObservable.set({ displayName: (this.displayName), email: (this.email)});
        console.log(user + "created")
        //route new user to home screen
        this.router.navigate(['/home']); 
      } 
      else {
        console.log("no user")
        this.router.navigate(['/welcomescreen']);
      }
    });
  }

  //route user back to welcomescreen
  welcomeScreen() {
    this.router.navigate(['/welcomescreen']); 
  }
}
