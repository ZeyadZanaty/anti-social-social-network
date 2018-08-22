import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  gender:boolean;

  constructor() {
  }

  ngOnInit() {
  }
  register(){
      console.log(this.name,this.username,this.email,this.password,this.gender);
  }
}
