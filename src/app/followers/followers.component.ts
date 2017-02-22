import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {Observable} from 'rxjs/Observable';
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
  ActivatedRoute,
  Routes, 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})

export class FollowersComponent implements OnInit {

  followers: FirebaseListObservable<any>;
  displayName;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private router: Router, private route: ActivatedRoute, private users: UserService) {}

   ngOnInit() {
    this.af.auth.subscribe( (user) => {
      
      if (user) {
        var uid_followers = user.uid+"-followers";
        this.followers = this.af.database.list('user-data/'+uid_followers)
          .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      }
    })
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
