import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig, 
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayName;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private route: ActivatedRoute, private router: Router, private users: UserService) {}

  //TODO: display user-data in template
  //TODO: display user-activity in template

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
        .subscribe((id) => {
          this.users.fetch_user_data(id)
            .subscribe(user => {
              this.displayName = user;
                console.log(this.displayName)
            })
        }) 
  }

  follow() { 
      this.af.auth.subscribe( (user) => {
        if (user) {
          var uid_followers = user.uid+"-followers";
          var uid = user.uid;
          console.log(uid)
          const followers = this.af.database.list("user-data/"+uid_followers)
          followers.push({ cu_uid: (uid), cu_username: ("username"), ou_uid: ("uid"), ou_username: ("username") });    
        } 
      });
  } 

}
