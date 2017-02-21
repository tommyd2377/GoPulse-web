import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
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
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';

@Component({
  selector: 'welcomescreen',
  templateUrl: './welcomescreen.component.html',
  styleUrls: ['./welcomescreen.component.css']
})

export class WelcomescreenComponent implements OnInit {

  constructor(public router: Router, private af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.router.navigate(['/home']); 
      }
    })
  }
  
  signUp() {
    this.router.navigate(['/signup']); 
  }

  login() {
    this.router.navigate(['/login']); 
  }
}
