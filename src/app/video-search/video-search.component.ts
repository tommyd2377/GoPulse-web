import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'videosearch',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css'],
  providers:[YoutubeService]
})

export class VideoSearchComponent {
    
    //new search via angular FormControl
    search = new FormControl;
    //create Observable for results
    results: Observable<any>;

    //pass in youtube service and angular router via direct injection
    constructor(public youtube:YoutubeService, private router: Router) {

    //fetch results from YoutubeService search function
    this.results = 
       this.search.valueChanges
        .debounceTime(200)
        .switchMap(query => youtube.search(query));
        }
}
    



