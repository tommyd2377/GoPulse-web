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
    
    search = new FormControl;
    results: Observable<any>;

    constructor(public youtube:YoutubeService, private router: Router) {

    this.results = 
       this.search.valueChanges
        .debounceTime(200)
        .switchMap(query => youtube.search(query));
        //console.log(results)
    }
}

    //search = new FormControl;
    //results: Observable<any>;
    //query;

    //constructor(public youtube:YoutubeService, private router: Router) {}

    //go() {
    // this.results = this.youtube.search(this.query)
    //}
    
    //<md-input [(ngModel)]="query" placeholder="search YouTube"></md-input>
    //<button (click)="go()">Go!</button>

    



