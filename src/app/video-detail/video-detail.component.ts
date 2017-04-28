import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
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
  selector: 'videos',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})

export class VideoDetailComponent implements OnInit {

  votes: FirebaseListObservable<any[]>;
  posts: FirebaseListObservable<any[]>;
  dm: FirebaseListObservable<any[]>;
  followers: FirebaseListObservable<any[]>;
  video_votes: FirebaseListObservable<any[]>;
  video_dm: FirebaseListObservable<any[]>;
  video_post: FirebaseListObservable<any[]>;
  url: SafeResourceUrl;
  video;
  title;
  description;
  id;
  thumbnail;
  username;
  comment;
  comments;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    public youtube: YoutubeService, private route: ActivatedRoute,
    private router: Router, sanitizer: DomSanitizer, private userservice: UserService) {
        
      this.route.params
        .map(params => params['id'])
          
          .subscribe((id) => {
            this.youtube.getVideo(id)
              .subscribe(video => { 
                
                this.id = video.items[0].id;
                this.url = sanitizer.bypassSecurityTrustResourceUrl
                ("https://www.youtube.com/embed/"+this.id+"?autoplay=1");
              
              })
          }) 
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
              this.comments = this.af.database.list("video-data/"+(this.id)+"-posts")
              .map((array) => array.reverse()) as FirebaseListObservable<any[]>; 
            
            })
        }) 
  }
  
  twoThumbsUp() { 
  
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid_votes = user.uid+"-votes";
        var uid = user.uid;
        var displayName = user.auth.displayName;
        
        this.route.params
        .map(params => params['id'])
        
        .subscribe((id) => {
          this.youtube.getVideo(id)
          
        .subscribe(video => {
          this.title = video.items[0].snippet.title;
          this.id= video.items[0].id;
          this.thumbnail = video.items[0].snippet.thumbnails.high.url;
          
          const video_votes = this.af.database.list("video-data/"+(this.id)+"-votes")
            video_votes.push({ uid: (uid), username: (displayName), vid: (this.id),
            videoTitle: (this.title), thumbnail: (this.thumbnail) });
          
         // const votes = this.af.database.list("user-data/"+uid_votes)
          //  votes.push({ uid: (uid), username: (displayName), vid: (this.id),
          //  videoTitle: (this.title), thumbnail: (this.thumbnail) });

          const activity = this.af.database.list("user-data/"+uid+"-activity")
            activity.push({ uid: (uid), username: (displayName), vid: (this.id),
            videoTitle: (this.title), thumbnail: (this.thumbnail) });
          
          this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
            .subscribe(snapshots=>{
              snapshots.forEach(snapshot => {
                
              //  const follower = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-votes")
              //  console.log(snapshot.val().follower_uid)
              //  follower.push({ uid: (uid), username: (displayName), vid: (this.id),
              //  videoTitle: (this.title), thumbnail: (this.thumbnail) });

                const follower_activity = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-activity")
                console.log(snapshot.val().follower_uid)
                follower_activity.push({ uid: (uid), username: (displayName), vid: (this.id),
                videoTitle: (this.title), thumbnail: (this.thumbnail) });
                });
              })
            
            })
          }) 
        } 
        
        else {
          console.log("no user")
          this.router.navigate(['/weclomescreen'])
        }
      
    });
  } 
           
  //TODO: save data to user selection
  directMessage() {
    
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid_dms = user.uid+"-dms";
        var uid = user.uid;
        var displayName = user.auth.displayName;
          
          this.route.params
          .map(params => params['id'])
          
          .subscribe((id) => {
            this.youtube.getVideo(id)
          
          .subscribe(video => {
            this.title = video.items[0].snippet.title;
            this.description = video.items[0].snippet.description;  
            this.id= video.items[0].id;
            this.thumbnail = video.items[0].snippet.thumbnails.high.url;
                            
            const dm = this.af.database.list("user-data/"+uid_dms)
            dm.push({ uid: (uid), username: (displayName), vid: (this.id),
            videoTitle: (this.title), thumbnail: (this.thumbnail) });
            
            const video_dm = this.af.database.list("video-data/"+(this.id)+"-dm")
            video_dm.push({ uid: (uid), username: (displayName), vid: (this.id),
            videoTitle: (this.title), thumbnail: (this.thumbnail) });
            
            this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
              .subscribe(snapshots=>{
                snapshots.forEach(snapshot => {
                                        
                const follower = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-dm")
                follower.push({ uid: (uid), username: (displayName), vid: (this.id),
                videoTitle: (this.title), thumbnail: (this.thumbnail) });

                const follower_activity = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-activity")
                console.log(snapshot.val().follower_uid)
                follower_activity.push({ uid: (uid), username: (displayName), vid: (this.id),
                videoTitle: (this.title), thumbnail: (this.thumbnail) });
                
                });
                })
          });
          })
        } 
        
        else {
          console.log("no user")
          this.router.navigate(['/weclomescreen'])
        }
      
    });
  }

  post() {
    
    this.af.auth.subscribe( (user) => {
      if (user) {
        var uid_posts = user.uid+"-posts";
        var uid = user.uid;
        var displayName = user.auth.displayName;

           this.route.params
           .map(params => params['id'])
           
           .subscribe((id) => {
              this.youtube.getVideo(id)
                    
            .subscribe(video => {
              this.title = video.items[0].snippet.title;
              this.description = video.items[0].snippet.description;  
              this.id= video.items[0].id;
              this.thumbnail = video.items[0].snippet.thumbnails.high.url;
                            
            //  const posts = this.af.database.list("user-data/"+uid_posts)
            //  posts.push({ uid: (uid), username: (displayName), vid: (this.id),
            //  videoTitle: (this.title), thumbnail: (this.thumbnail), comment: (this.comment) });

              const activity = this.af.database.list("user-data/"+uid+"-activity")
              activity.push({ uid: (uid), username: (displayName), vid: (this.id),
              videoTitle: (this.title), thumbnail: (this.thumbnail), comment: (this.comment) });
              
              const video_post = this.af.database.list("video-data/"+(this.id)+"-posts")
              video_post.push({ uid: (uid), username: (displayName), vid: (this.id),
              videoTitle: (this.title), thumbnail: (this.thumbnail), comment: (this.comment) });
              
                this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
                  .subscribe(snapshots=>{
                    snapshots.forEach(snapshot => {
                      
                    //  console.log(snapshot.val().follower_uid)
                    //  const follower = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-posts")
                    //  follower.push({ uid: (uid), username: (displayName), vid: (this.id),
                    //  videoTitle: (this.title), thumbnail: (this.thumbnail), comment: (this.comment) });

                      const follower_activity = this.af.database.list("user-data/"+(snapshot.val().follower_uid)+"-followee-activity")
                      console.log(snapshot.val().follower_uid)
                      follower_activity.push({ uid: (uid), username: (displayName), vid: (this.id),
                      videoTitle: (this.title), thumbnail: (this.thumbnail), comment: (this.comment) });
                    });
                    })
            });
          })
    } 
        
        else {
          console.log("no user")
          this.router.navigate(['/weclomescreen'])
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

