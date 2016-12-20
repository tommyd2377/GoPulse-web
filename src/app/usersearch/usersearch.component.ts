import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css']
})
export class UsersearchComponent {
  usersearch: String;
  users: FirebaseListObservable<any[]>;

constructor(af: AngularFire) {

    this.users = af.database.list('/user-data', {
      query: {
        orderByChild: 'displayName',
        equalTo: this.usersearch
      }
    });
    console.log(this.usersearch)
  }
}
