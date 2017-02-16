import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//set base url for HTTP requests
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';
//set token for YouTube API requests
const API_TOKEN = 'AIzaSyAJNsnnVl8HfbViTs5qCNGHs2AzN2BKSTE';

@Injectable()
export class YoutubeService {

  //pass in HTTP via direct injection
  constructor(private http:Http) {}
  
  //dynamically search YouTube API with user query
  search(query) {
    return this.http.get(`${BASE_URL}search?q=${query}&part=snippet&type=video&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }

  //fetch video and video meta-data after user selection
  getVideo(id:string) {
    return this.http.get(`${BASE_URL}videos?id=${id}&part=snippet&type=video&key=${API_TOKEN}`)
      .map(res => res.json());
  }
}