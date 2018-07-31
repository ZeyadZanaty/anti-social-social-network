import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fullImagePath: string;
  username:string;
  password:string;
  constructor(private userService:UserService) {
     this.fullImagePath = '../../assets/images/logo.png'
  }

  ngOnInit() {

  }
  login(){
    console.log(this.username,this.password);
  }

}
