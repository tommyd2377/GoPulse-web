import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyAJNsnnVl8HfbViTs5qCNGHs2AzN2BKSTE';

@Injectable()
export class YoutubeService {
  constructor(private http:Http){}
  search(query){
    return this.http.get(`${BASE_URL}?q=${query}&part=snippet&type=video&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
}
