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
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'videos',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})

export class VideoDetailComponent implements OnInit{

twothumbsups: FirebaseListObservable<any[]>;
url: SafeResourceUrl;
video;
title;
description;
id;
ids = [];

constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    public youtube: YoutubeService, private route: ActivatedRoute,
    private router: Router, sanitizer: DomSanitizer) {
       this.url = sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.getId()+"?autoplay=1");
    }
    
ngOnInit() {
    this.route.params
            .map(params => params['id'])
                .subscribe((id) => {
                this.youtube.getVideo(id)
                   .subscribe(video => {
                      this.title = video.items[0].snippet.title;
                      this.description = video.items[0].snippet.description;  
                      this.id = video.items[0].id;
                      this.ids.push(this.id)
                    })
                }) 
              console.log(this.ids)
}  

getId() {
   this.route.params
            .map(params => params['id'])
                .subscribe((id) => {
                this.youtube.getVideo(id)
                   .subscribe(video => {
                      this.title = video.items[0].snippet.title;
                      this.description = video.items[0].snippet.description;  
                      this.id = video.items[0].id;
                      this.ids.push(this.id)
                    })
                }) 
              console.log(this.ids.indexOf(0))
              return this.ids[0];
}

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

