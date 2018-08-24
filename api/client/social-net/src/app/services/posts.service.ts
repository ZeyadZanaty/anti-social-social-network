import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsUrl:string = "http://localhost:3000/api/posts/";
  constructor (private _http: Http, public router:Router) {};

  newPost(post){
    return this._http.post(this.postsUrl,post)
    .map(data => data.json());
  }

  getPosts(id){
    return this._http.get(this.postsUrl+"?filter=[where][myUserId]="+id)
    .map(data => data.json());
  }
}
