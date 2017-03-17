import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
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
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  votes: FirebaseListObservable<any>;
  posts: FirebaseListObservable<any>;
  dms: FirebaseListObservable<any>;
  activity: FirebaseListObservable<any>;
  displayName;
  
  constructor(private af: AngularFire, private Auth: FirebaseAuth, private router: Router, 
    private user: UserService) {}

  ngOnInit() {
    this.af.auth.subscribe( (user) => {
        if (user) {
        var vote_activity = user.uid+"-votes";
        var post_activity = user.uid+"-posts";
        var dm_activity = user.uid+"-dm";
        var activity = user.uid+"-activity";
        var uid = user.uid;
          
          this.votes = this.af.database.list('user-data/'+vote_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          this.activity = this.af.database.list('user-data/'+activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          this.posts = this.af.database.list('user-data/'+post_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          this.dms = this.af.database.list('user-data/'+dm_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
              var uid = user.uid;
              
          this.user.fetch_user_data(uid)
            .subscribe(user => {
              this.displayName = user;
            })
        }
    })
  }

      signOut() {
        this.af.auth.logout();
        this.router.navigate(['/welcomescreen'])
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

  followers() {
    this.router.navigate(['/followers'])
  }

  followees() {
    this.router.navigate(['/followees'])
  }


}
