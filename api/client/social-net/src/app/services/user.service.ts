import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usersUrl:string = "http://localhost:3000/api/myUsers/";
  constructor (private _http: Http, public router:Router) {};

userLogin(credentials){
  return this._http.post(this.usersUrl+'login',credentials)
  .map(data=>data.json());
}

createUser(user){
  return this._http.post(this.usersUrl,user)
  .map(user => user.json());
}

getUserBy(id,at){
  return this._http.get(this.usersUrl+id+"?access_token="+at)
  .map(data=>data.json());
}


}
