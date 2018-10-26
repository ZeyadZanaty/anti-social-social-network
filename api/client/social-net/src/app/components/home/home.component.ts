import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NavigationEnd } from '@angular/router';
import { UserService } from "../../services/user.service";
import { slideToRightFaster } from '../../router.animations'
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideToRightFaster()],
})
export class HomeComponent implements OnInit {

  userID:number;
  display:boolean;
  user:any;
  postText:string;
  postsData:any=[];
  isActive = true;
  showMenu = '';
  displayFailSuccess:boolean = false;
  displayMessaageDialog:boolean = false;
  displayMessage:String;
  constructor(private router:Router, private postService:PostsService,
    private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    let at=sessionStorage.getItem("at");
    this.userID = parseInt(sessionStorage.getItem("id"));
    this.display=true;
    this.userService.getUser(this.userID,at).subscribe(user=>this.user=user);
    this.postsData=this.getPosts();
  }

  getPosts(){
    let postsData =[]
    this.postService.getMyPosts(this.userID)
    .subscribe(posts=>{
      postsData.push(...posts);
      postsData.sort(function(a, b){
      var dateA=new Date(a.time), dateB=new Date(b.time)
      return dateA<dateB?1:-1;
    });
    });

    this.postService.getFriendsPosts(this.userID)
    .subscribe(friends=>{
      for(let friend of friends){
        for(let post of friend.posts)
        postsData.push(post);
      }
      postsData.sort(function(a, b){
      var dateA=new Date(a.time), dateB=new Date(b.time)
      return dateA<dateB?1:-1;
    });
  });
    return postsData;
  }


  onPost(){
    let newPost = {
      "content":this.postText,
      "myUserId":this.userID,
      "time":Date.now()
    }
    if(newPost.content)
    this.postService.newPost(newPost).subscribe(
    post=>{
      post['myUser']=this.user;
      this.postsData.unshift(post);
    }
    ,err=>{
      this.displayMessage='Something went wrong..';
      this.displayFailSuccess=true;
      this.displayMessaageDialog = true;
    });
  }

}
