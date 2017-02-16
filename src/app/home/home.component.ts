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
  
  //set twothumbsup property as FirebaseListObservable
  twothumbsups: FirebaseListObservable<any[]>;
  
  //pass AngularFire, FirebaseAuth, and Router via direct injection
  constructor(private af: AngularFire, private Auth: FirebaseAuth, private router: Router) {}

  ngOnInit() {
    //retrieve user credentials
    this.af.auth.subscribe( (user) => {
      if (user) {
      //set database extension
      var uidTwoThumbsUp = user.uid+"-twothumbsup";
      var uid = user.uid;
      console.log(uid)
      //set data retrieval path
      this.twothumbsups = this.af.database.list('user-data/'+uidTwoThumbsUp);
      } 
      else {
      //no user, route to welcome screen
      console.log("no user")
      this.router.navigate(['/welcomescreen'])
      }
    });
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  //set navigation router paths
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







