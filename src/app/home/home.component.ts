import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
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
  
  votes: FirebaseListObservable<any>;
  
  constructor(private af: AngularFire, private Auth: FirebaseAuth, private router: Router) {}

  //TODO: retrieve data from posts, following activty, dms
  //TODO: combine latest fom votes, posts, and following activty
  //TODO: post dms at top
  
  ngOnInit() {
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid_votes = user.uid+"-votes";
        var uid = user.uid;
        console.log(uid)
        this.votes = this.af.database.list('user-data/'+uid_votes)
          .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      } 
      else {
        console.log("no user")
        this.router.navigate(['/welcomescreen'])
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







