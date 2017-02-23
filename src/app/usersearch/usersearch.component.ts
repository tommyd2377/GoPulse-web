import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css']
})

export class UsersearchComponent {

  userquery: String;
  users: FirebaseListObservable<any>;

  constructor(private af: AngularFire) {}

  userSearch(userquery: String) {
    
    this.users = this.af.database.list('user-data/',{
      query: {
        orderByChild: 'fullname',
        equalTo: (this.userquery)
      }
    })
  }
}