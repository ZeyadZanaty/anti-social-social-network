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
  usersUrl:string = "http://localhost:3000/api/myUsers/";
  reactionsUrl:string = "http://localhost:3000/api/reactions/";
  at = sessionStorage.getItem("at");
  constructor (private _http: Http, public router:Router) {};

  newPost(post){
    return this._http.post(this.postsUrl,post)
    .map(data => data.json());
  }

  getMyPosts(id){
    return this._http.get(this.postsUrl+"?filter[where][myUserId]="+id+"&filter[include][myUser]&filter[include][reactions]")
    .map(data => data.json());
  }

  getFriendsPosts(id){
    return this._http.get(this.usersUrl+id+"/friends?filter[include][posts]=myUser&access_token="+this.at)
    .map(data => data.json());
  }
  react(reaction){
    return this._http.post(this.reactionsUrl,reaction)
    .map(data => data.json());
  }
  getPostReactions(id){
    return this._http.get(this.postsUrl+id+"/reaction")
    .map(data => data.json());
  }
  findOneReaction(userid,postid){
    return this._http.get(this.reactionsUrl+"findOne?filter[where][myUserId]="+userid+"&filter[where][postId]="+postid)
    .map(data => data.json());
  }
  deleteReaction(reactionid){
    return this._http.delete(this.reactionsUrl+reactionid)
    .map(data => data.json());
  }
  editReaction(reaction){
    return this._http.put(this.reactionsUrl,reaction)
    .map(data => data.json());
  }
  deletePost(postid){
    return this._http.delete(this.postsUrl+postid)
    .map(data => data.json());
  }
}
