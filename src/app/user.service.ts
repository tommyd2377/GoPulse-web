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

  current_username: FirebaseObjectObservable<any[]>;
  other_username: FirebaseObjectObservable<any[]>;

  constructor(private af: AngularFire) { }

  getOthertUserName(id) {
      this.other_username = this.af.database.object('user-data/'+id);
      return this.other_username
    }
}
