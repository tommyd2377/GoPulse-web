import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const base_url = 'https://www.googleapis.com/youtube/v3/';
const api_key = 'AIzaSyAJNsnnVl8HfbViTs5qCNGHs2AzN2BKSTE';

@Injectable()
export class YoutubeService {

  constructor(private http:Http) {}
  
  search(query) {
    return this.http.get(`${base_url}search?q=${query}&part=snippet&maxResults=50&type=video&key=${api_key}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }

  getVideo(id:string) {
    return this.http.get(`${base_url}videos?id=${id}&part=snippet&type=video&key=${api_key}`)
      .map(res => res.json());
  }
}