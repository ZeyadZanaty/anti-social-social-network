import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService],
})
export class SignupComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  gender:String;
  displayFailSuccess:boolean = false;
  displayMessaageDialog:boolean;
  displayMessage:String;
  constructor(private userService: UserService,public router: Router) { };


  ngOnInit() {
  }

  registerUser(){
      this.displayMessaageDialog=false;
      if (!(this.name||this.username||this.email||this.password||this.gender)){
        this.displayMessage="Please enter the required fields..";
        this.displayFailSuccess=true;
        setTimeout(()=>{
          this.displayMessaageDialog=true;
        },100);
      }
      else if(this.password.length<6){
        this.displayMessage="Passwords must be at least 6 charachters long...";
        this.displayFailSuccess=true;
        setTimeout(()=>{
          this.displayMessaageDialog=true;
        },100);
       }
      else{
        let user = {
          "realm":this.name,
          "username":this.username,
          "gender":this.gender,
          "email":this.email.toLowerCase(),
          "password":this.password,
          "emailVerified":false
        }
        this.userService.createUser(user).
        subscribe(user => {
          this.displayMessage="Registration Successfull! You'll be redirected to login in 5 seconds...";
          this.displayFailSuccess=false;
          this.displayMessaageDialog=true;
          setTimeout(()=>{ this.router.navigateByUrl('/login');},5000);
        },
        err =>{
          this.displayMessage="E-mail/Username already in use...";
          this.displayFailSuccess=true;
          setTimeout(()=>{
            this.displayMessaageDialog=true;
          },100);
        });
      }
    }
}
