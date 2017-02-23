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
  
  votes: FirebaseListObservable<any>;
  posts: FirebaseListObservable<any>;
  dms: FirebaseListObservable<any>;
  name;
  profile;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private route: ActivatedRoute, private router: Router, private users: UserService) {}

  ngOnInit() {
    
    this.route.params
      .map(params => params['id'])
        .subscribe((id) => {
          
          var vote_activity = id+"-votes";
          var post_activity = id+"-posts";
          var dm_activity = id+"-dm";

          this.votes = this.af.database.list('user-data/'+vote_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          this.posts = this.af.database.list('user-data/'+post_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
          this.dms = this.af.database.list('user-data/'+dm_activity)
            .map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    
    this.users.fetch_user_data(id)
        .subscribe(user => {
          this.profile = user;
        })
        }) 
  }

  follow() { 
      
      this.af.auth.subscribe( (user) => {
        if (user) {
          var uid_followees = user.uid+"-followees";
          var uid = user.uid;
          var displayName = user.auth.displayName;
          console.log(user)
            
      this.route.params
        .map(params => params['id'])
          .subscribe((id) => {
            this.users.fetch_user_data(id)
          
          .subscribe(user => {
            this.profile = (user);
            this.users.fetch_user_data(uid)
                
          .subscribe(otheruser => {
            this.name = (otheruser)
              const followees = this.af.database.list("user-data/"+uid_followees)
              followees.push({ followee_uid: (id), followee_username: (''), follower_username: (displayName), follower_uid: (uid) });
              const follower = this.af.database.list("user-data/"+id+"-followers")
              follower.push({ followee_uid: (id), followee_username: (id), follower_username: (displayName), follower_uid: (uid) });
            
            this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
              .subscribe(snapshots=>{
                snapshots.forEach(snapshot => {
                  const followers = this.af.database.list("user-data/"+id+"-following-activity")
                  followers.push({ follower: (id), cu_username: ("username"), ou_username: ("username"), followee: (uid) });
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


