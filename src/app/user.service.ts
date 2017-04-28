import { Injectable } from '@angular/core';
import {defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig, 
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  user_data: FirebaseObjectObservable<any[]>;

//  current_username: FirebaseObjectObservable<any[]>;
//  user_followers: FirebaseListObservable<any[]>;
//  displayName;
//  name: FirebaseListObservable<any>;

  constructor(private af: AngularFire) { }

  fetch_user_data(id) {
      this.user_data = this.af.database.object('user-data/'+id);
      return this.user_data
  }
  
}
