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

  displayName;
  name;

  constructor(private af: AngularFire, private Auth: FirebaseAuth, 
    private route: ActivatedRoute, private router: Router, private users: UserService) {}

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
        .subscribe((id) => {
          this.users.fetch_user_data(id)
            .subscribe(user => {
              this.displayName = user;
                console.log(this.displayName)
            })
        }) 
  }

  follow() { 
      this.af.auth.subscribe( (user) => {
        if (user) {
          var uid_followees = user.uid+"-followees";
          var uid = user.uid;
          console.log(uid)
            this.route.params
              .map(params => params['id'])
                .subscribe((id) => {
                  this.users.fetch_user_data(id)
                    .subscribe(user => {
                      this.displayName = (user);
                        this.users.fetch_user_data(uid)
                        .subscribe(otheruser => {
                          this.name = (otheruser)
                          console.log(this.name)
                          const followees = this.af.database.list("user-data/"+uid_followees)
                          followees.push({ followee: (id), cu_username: (''), ou_username: (''), follower: (uid) });
                          const follower = this.af.database.list("user-data/"+id+"-followers")
                          follower.push({ followee: (id), cu_username: (''), ou_username: (''), follower: (uid) });
                          this.af.database.list('user-data/'+uid+'-followers', { preserveSnapshot: true})
                                  .subscribe(snapshots=>{
                                      snapshots.forEach(snapshot => {
                                        const followers = this.af.database.list("user-data/"+id+"-following-activity")
                                        followers.push({ follower: (id), cu_username: ("username"), ou_username: ("username"), followee: (uid) }); 
                                        console.log(snapshot.key, snapshot.val().followee);
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

  profile() {
    this.router.navigate(['/profile'])
  }


}


