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

  activity: FirebaseListObservable<any>;
  followercount: FirebaseListObservable<any>;
  followeecount: FirebaseListObservable<any>;
  name;
  profile;
  
  // votes: FirebaseListObservable<any>;
  // posts: FirebaseListObservable<any>;
  // dms: FirebaseListObservable<any>;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private route: ActivatedRoute, private router: Router, private users: UserService) {}

  ngOnInit() {
    
    this.route.params
      .map(params => params['id'])
        .subscribe((id) => {
          
          var activity = id+"-activity";

          this.followercount = this.af.database.list("user-data/"+(id)+"-followers");
          this.followeecount = this.af.database.list("user-data/"+(id)+"-followees");
          
          // var vote_activity = id+"-votes";
          // var post_activity = id+"-posts";
          // var dm_activity = id+"-dm";

          this.activity = this.af.database.list('user-data/'+activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;

          // this.votes = this.af.database.list('user-data/'+vote_activity)
          //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          // this.posts = this.af.database.list('user-data/'+post_activity)
          //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          // this.dms = this.af.database.list('user-data/'+dm_activity)
          //  .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    
          this.users.fetch_user_data(id)
              .subscribe(user => {
                this.profile = user;
              })
        
        }) 
  }

  follow() { 
      
      this.af.auth.subscribe( (user) => {
        if (user) {
          var uid = user.uid;
          var uid_followees = uid+"-followees";
          var displayName = user.auth.displayName;
     
            
      this.route.params
        .map(params => params['id'])
          .subscribe((id) => {
            this.users.fetch_user_data(id)
          
          .subscribe(user => {
            this.profile = (user);
            this.users.fetch_user_data(uid)
                
          .subscribe(otheruser => {
            this.name = (otheruser)
              const activity1 = this.af.database.list("user-data/"+uid+"-activity")
              activity1.push({ followee_uid: (id), followee_username: (this.profile.displayName), follower_username: (displayName), follower_uid: (uid) });
              const followees = this.af.database.list("user-data/"+uid_followees)
              followees.push({ followee_uid: (id), followee_username: (this.profile.displayName), follower_username: (displayName), follower_uid: (uid) });
              const follower = this.af.database.list("user-data/"+id+"-followers")
              follower.push({ followee_uid: (id), followee_username: (this.profile.displayName), follower_username: (displayName), follower_uid: (uid) });
              const activity2= this.af.database.list("user-data/"+id+"-activity")
              activity2.push({ followee_uid: (id), followee_username: (this.profile.displayName), follower_username: (displayName), follower_uid: (uid) });
            
            this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
              .subscribe(snapshots=>{
                snapshots.forEach(snapshot => {
                  const followers = this.af.database.list("user-data/"+id+"-following-activity")
                  followers.push({ follower_uid: (id), follower_username: (this.profile.displayName), followee_username: (displayName), followee_uid: (uid) });
                })
              });
              })
              })
              })  
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

  profileRoute() {
    this.router.navigate(['/profile'])
  }


}


