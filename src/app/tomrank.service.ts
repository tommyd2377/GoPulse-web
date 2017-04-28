import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';

@Injectable()
export class TomrankService {

  constructor(private af: AngularFire, private user_data: UserService) {}

  uid: String;

  getVids() {
    return this.af.database.list(this.uid+"-votes");
    return this.af.database.list("user-data/"+queryChild(uid, votes));
  }
  
  tomRank(uid: Number) {


     this.af.database.list('video-data/', { preserveSnapshot: true})
              .subscribe(snapshots=>{
                snapshots.forEach(snapshot => {

                  //push video-data + vid-keys to matrix_a
                  //vid == i[0] j[0]+1
                  //vid keys == i[1] j[0]+1
                  //count i[1] j[0]+1 and push vid and number of keys to matrix_b
                  //rank j[1] by number of keys and push ranked j[0] to matrix_c
                  //result == matrix_c j[0]  

                })
              });
    
    var user_vids = this.getVids();

    var matrix_a  = [
      [1, 2, 3],
      [4, 5, 6],    
      [7, 8, 9],
    ];

    for(var i = 1; i < matrix_a.length; i++) {
        var matrix_a1 = matrix_a[i];
        for(var j = 1; j < matrix_a.length; j++) {
            console.log("cube[" + i + "][" + j + "] = " + matrix_a1[j]);
              if (matrix_a1[j] === user_vids) {
                  //push matching vids to matrix_b
        }
    }


    var matrix_b  = [
      [1, 2, 3],
      [4, 5, 6],    
      [7, 8, 9],
    ];

    for(var i = 1; i < matrix_a.length; i++) {
        var matrix_a1 = matrix_a[i];
        for(var j = 1; j < matrix_a.length; j++) {
            console.log("cube[" + i + "][" + j + "] = " + matrix_a1[j]);
           
                //get length of matrix_b[i] - 1 and push to matrix_c
        }
    }

    
    var matrix_c  = [
      [1, 2, 3],
      [4, 5, 6],    
      [7, 8, 9],
    ];

    for(var i = 1; i < matrix_a.length; i++) {
        var matrix_a1 = matrix_a[i];
        for(var j = 1; j < matrix_a.length; j++) {
            console.log("cube[" + i + "][" + j + "] = " + matrix_a1[j]);
              if (matrix_a1[j] === user_vids) {
                
        }
    
    //loop through user_vids and print uids

    //loop through uids and print vids
    //loop through vids and if vid == user_vid store vid with that uid
    //convert array to number
    //return all videos
    //loop through vids and add number to video base vote
    //update video votes
    //rank videos based on updated vote
    //return ranked videos

    //current_user => other_user == vote_intersection
    //current_user => followee == vote_intersection + all votes x2
    //current_user => other_user post on voted video == vote_intersection + all votes x2
    //current_user => followee_dm == vote_intersection + all votes x4
    //current_user =>
    
  }

}


