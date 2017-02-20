import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';

@Injectable()
export class TomrankService {

  constructor(private af: AngularFire, private user_data: UserService) {}

  uid;
  user_vote_vids;

  getVids() {
    return this.af.database.list(this.uid+"-votes");
  }
  
  tomRank(uid) {
    var a = this.getVids();
  }

}


