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
  selector: 'app-followees',
  templateUrl: './followees.component.html',
  styleUrls: ['./followees.component.css']
})

export class FolloweesComponent implements OnInit {

  followees: FirebaseListObservable<any>;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private router: Router) {}

  ngOnInit() {
    this.af.auth.subscribe( (user) => {
      
      if (user) {
        var uid_followees = user.uid+"-followees";
        this.followees = this.af.database.list('user-data/'+uid_followees)
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
