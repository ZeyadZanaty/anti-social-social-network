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
  constructor (private postService:PostsService) { }

  ngOnInit() {
    this.getPostReactions();
  }
  getPostReactions(){
    this.postService.getPostReactions(this.postData.id)
    .subscribe(reacts=>{
      this.postReactions=reacts;
      this.reactCounts=reacts.length;
    });
  }
  onReact(type){
    this.postService.react({"type":type,"myUserId":this.postData.myUser.id,"postId":this.postData.id})
    .subscribe(()=>this.getPostReactions());
  }
}
