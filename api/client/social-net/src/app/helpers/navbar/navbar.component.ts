import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [routerTransition(1)]
})
export class NavbarComponent implements OnInit {

  userID:number;
  user:any;
  constructor(private router:Router, private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    let at=sessionStorage.getItem("at");
    this.userID = sessionStorage.getItem("id");
    this.userService.getUser(this.userID,at).subscribe(user=>this.user=user);
  }

}
