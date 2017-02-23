import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
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
  selector: 'app-userfollowers',
  templateUrl: './userfollowers.component.html',
  styleUrls: ['./userfollowers.component.css']
})
export class UserfollowersComponent {

  followers: FirebaseListObservable<any>;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private router: Router, private route: ActivatedRoute, private users: UserService)  {}

  //ngOnInit() {
    // this.route.params
     // .map(params => params['id'])
       // .subscribe((id) => { 
         // var uid_followers = id+"-followers";
          //this.followers = this.af.database.list('user-data/'+uid_followers)
         // .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
       // )}
  //}
}
