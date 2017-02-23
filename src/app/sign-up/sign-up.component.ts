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
  FirebaseAuthState,
  FirebaseApp} from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  email;
  password;
  displayName;
  fullname;
  authState;
 
  constructor(private af: AngularFire, private auth: FirebaseAuth, private router: Router) {
       this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

   ngOnInit() {
    
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.router.navigate(['/home']); 
      }
    })
  }
  
  createUser() {
    
    this.af.auth.createUser({ email: (this.email), password: (this.password)})
    this.af.auth.subscribe( (user1) => {
        
        if (user1) {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: (this.displayName),
            photoURL: 'some/url',
          })
          
          console.log(user1)
          console.log(user)
          
          var uid = user.uid;
          const user_data_db = this.af.database.object('user-data/' + uid);
          user_data_db.set({ fullname: (this.fullname), displayName: (this.displayName), 
          email: (this.email), uid: (uid)});
            this.router.navigate(['/home']); 
        } 
        
        else {
          this.router.navigate(['/welcomescreen']);
        }
      
        });
  }

  welcomeScreen() {
    this.router.navigate(['/welcomescreen']); 
  }

  about() {
    this.router.navigate(['/about']); 
  }

  contact() {
    this.router.navigate(['/contact']); 
  }

  terms() {
    this.router.navigate(['/terms']); 
  }

  privacy() {
    this.router.navigate(['/privacy']); 
  }

}
