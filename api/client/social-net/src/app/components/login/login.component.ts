import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fullImagePath: string;
  email:string;
  password:string;
  authenticated:boolean;
  displayFailSuccess:boolean = false;
  displayMessaageDialog:boolean = false;
  displayMessage:String;
  AccessToken;
  constructor(private userService:UserService,private router:Router) {
     this.fullImagePath = '../../assets/images/logo.png'
  }

  ngOnInit() {

  }

  onLogin() {
      this.displayMessaageDialog = false;
      let credentials={
        "email":this.email.toLowerCase(),
        "password":this.password,
      };
        this.userService.userLogin(credentials).subscribe(
        data => {
          this.AccessToken=data.id;
          sessionStorage.setItem("at",data.id);
          this.router.navigateByUrl('/home/'+data.userId);
          sessionStorage.setItem('isLoggedin','true');
          sessionStorage.setItem("id",data.userId);
        },
        err=>{
          this.displayMessage='Wrong E-mail/Password Combination';
          this.displayFailSuccess=true;
          this.displayMessaageDialog = true;
        });
      }


}
