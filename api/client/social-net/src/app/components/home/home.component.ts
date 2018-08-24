import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userID:number;
  display:boolean;
  user:any;
  constructor(private router:Router,
    private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    let at=sessionStorage.getItem("at");
    this.userID = +this.route.snapshot.paramMap.get('id');
    this.display=true;
    this.userService.getUser(this.userID,at).subscribe(user=>this.user=user);
  }

}
