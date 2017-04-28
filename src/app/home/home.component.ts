import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {Observable} from 'rxjs/Observable';
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
  
  activity: FirebaseListObservable<any>;
  
  // votes: FirebaseListObservable<any>;
  // posts: FirebaseListObservable<any>;
  // dms: FirebaseListObservable<any>;
  // following: FirebaseListObservable<any>;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, private router: Router) {}
  
  ngOnInit() {
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid = user.uid;
        var activity = uid+"-followee-activity";
        
        // var vote_activity = uid+"-followee-votes";
        // var post_activity = uid+"-followee-posts";
        // var dm_activity = uid+"-followee-dm";
        // var following_activity = uid+"-following-activity";
      
        this.activity = this.af.database.list('user-data/'+activity)
          .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        
        // this.votes = this.af.database.list('user-data/'+vote_activity)
        //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        // this.following = this.af.database.list('user-data/'+following_activity)
        //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        // this.posts = this.af.database.list('user-data/'+post_activity)
        //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
        // this.dms = this.af.database.list('user-data/'+dm_activity)
        // .map((array) => array.reverse()) as FirebaseListObservable<any[]>;  
      
      } 
      
      else {
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







