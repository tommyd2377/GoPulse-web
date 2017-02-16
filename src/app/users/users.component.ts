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

  constructor(private af: AngularFire, private Auth: FirebaseAuth, private route: ActivatedRoute,
      private router: Router, private users: UserService) { }

ngOnInit() {
   this.route.params
              .map(params => params['id'])
                  .subscribe((id) => {
                  this.users.getOthertUserName(id)
                    .subscribe(user => {
                          this.displayName = user;
                          console.log(user)
                      })
                  }) 
}
}
