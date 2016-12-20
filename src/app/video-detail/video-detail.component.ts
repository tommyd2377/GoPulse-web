import { Component, OnInit } from '@angular/core';
import {defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig, 
  FirebaseObjectObservable, 
  FirebaseListObservable, 
  FirebaseAuth} from 'angularfire2';
import { YoutubeService } from '../youtube.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'videos',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})

export class VideoDetailComponent implements OnInit{

twothumbsups: FirebaseListObservable<any[]>;
video;
id: string;

constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    public youtube: YoutubeService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.youtube.getVideo(id)
                   .subscribe(video => {
                      this.video = video;
                       console.log(id)
                    })
            })
          }  

  twoThumbsUp() { 
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uidTwoThumbsUp = user.uid+"-twothumbsup";
        var uid = user.uid;
        console.log(uid)
        const twothumbsups = this.af.database.list('user-data/'+uidTwoThumbsUp)
        twothumbsups.push({ uid: (uid), vid: (uid) });
      } 
      else {
        console.log("no user")
      }
    });
   } 
}
