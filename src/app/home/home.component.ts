import { Component, OnInit } from '@angular/core';
import {defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig, 
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';
import { RouterModule, 
  Routes, 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  twothumbsups: FirebaseListObservable<any[]>;
  
  constructor(private af: AngularFire, private Auth: FirebaseAuth, private router: Router) {}

  ngOnInit() {
    this.af.auth.subscribe( (user) => {
      if (user) {
      var uidTwoThumbsUp = user.uid+"-twothumbsup";
      var uid = user.uid;
      console.log(uid)
      this.twothumbsups = this.af.database.list('user-data/'+uidTwoThumbsUp);
      } 
      else {
      console.log("no user")
      }
    });
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  home() {
    this.router.navigate(['/home'])
  }

  pulse() {
    this.router.navigate(['/popular'])
  }

  search() {
    this.router.navigate(['/search'])
  }

  profile() {
    this.router.navigate(['/profile'])
  }

}







