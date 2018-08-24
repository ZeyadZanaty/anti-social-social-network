import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
  constructor(private router:Router, private postService:PostsService,
    private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    let at=sessionStorage.getItem("at");
    this.userID = +this.route.snapshot.paramMap.get('id');
    this.display=true;
    this.userService.getUser(this.userID,at).subscribe(user=>this.user=user);
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts(this.userID)
    .subscribe(posts=>this.postsData=posts);
  }

  onPost(){
    let newPost = {
      "content":this.postText,
      "myUserId":this.userID
    }
    if(newPost.content)
    this.postService.newPost(newPost).subscribe(()=>this.getPosts());
  }

}
