import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NavigationEnd } from '@angular/router';
import { UserService } from "../../services/user.service";
import { slideToRightFaster,routerTransition } from '../../router.animations'
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [slideToRightFaster(),routerTransition(1)],

})
export class ProfileComponent implements OnInit {

  user:any;
  currentUserID:number;
  displayFailSuccess:boolean;
  displayMessaageDialog:boolean;
  displayMessage:string;
  at = sessionStorage.getItem("at");
  postsData:any=[];
  constructor(private router:Router, private postService:PostsService,
    private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.displayMessaageDialog = false;
    this.currentUserID = +this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.postsData=this.getPosts();

    setTimeout(()=>{
      console.log(this.user,this.postsData);
    },100);
  }

  getUser(){
    this.userService.getUser(this.currentUserID,this.at)
    .subscribe(user=>this.user=user);
    }

    getPosts(){
      let postsData=[]
      this.postService.getMyPosts(this.currentUserID)
      .subscribe(posts=>{
        postsData.push(...posts);
        postsData.sort(function(a, b){
        var dateA=new Date(a.time), dateB=new Date(b.time)
        return dateA<dateB?1:-1;
      });
      });
      return postsData;
    }
}
