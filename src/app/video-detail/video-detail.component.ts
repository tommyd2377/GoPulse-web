import { Component, OnInit } from '@angular/core';
import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig, 
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {

  twothumbsups: FirebaseListObservable<any[]>;
  
  constructor(private af: AngularFire, private Auth: FirebaseAuth) {}
  
  twoThumbsUp() { 
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uidTwoThumbsUp = user.uid+"-twothumbsup";
        var uid = user.uid;
        console.log(uid)
        const twothumbsups = this.af.database.list('user-data/'+uidTwoThumbsUp)
        twothumbsups.push({ uid: (uid), vid: "vid" });
      } 
      else {
        console.log("no user")
      }
    });
   } 
}
