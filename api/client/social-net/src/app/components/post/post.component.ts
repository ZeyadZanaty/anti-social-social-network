import { Component, OnInit,Input } from '@angular/core';
import { PostsService } from "../../services/posts.service";
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations:[routerTransition()]
})
export class PostComponent implements OnInit {

  @Input() user;
  @Input() postData;
  postReactions=[];
  reactCounts:number=0;
  userReaction:string;
  constructor (private postService:PostsService) { }

  ngOnInit() {
    this.getPostReactions();
    this.getUserReaction();
  }

  getUserReaction(){
    this.postService.findOneReaction(this.user.id,this.postData.id)
    .subscribe((react)=>{
      this.userReaction=react.type;
    },
    err=>{
      this.userReaction=null;
    });
  }

  getPostReactions(){
    this.postService.getPostReactions(this.postData.id)
    .subscribe(reacts=>{
      this.postReactions=reacts;
      this.reactCounts=reacts.length;
    });
  }

  onReact(type){
    this.postService.findOneReaction(this.user.id,this.postData.id)
    .subscribe((react)=>{
      if(react.type==type){
        this.postService.deleteReaction(react.id).subscribe(()=>this.ngOnInit());
      }
      else{
        this.postService.editReaction({"type":type,"myUserId":this.user.id,"postId":this.postData.id,"id":react.id})
        .subscribe(()=>this.ngOnInit());
      }
    },
    err=>{
      this.postService.react({"type":type,"myUserId":this.user.id,"postId":this.postData.id})
      .subscribe(()=>this.ngOnInit());
    });
  }
}
