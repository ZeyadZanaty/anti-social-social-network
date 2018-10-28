import { Component, OnInit,Input } from '@angular/core';
import { PostsService } from "../../services/posts.service";
import { routerTransition } from '../../router.animations';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations:[routerTransition()],
  providers:[ConfirmationService]
})
export class PostComponent implements OnInit {

  @Input() user;
  @Input() postData;
  postReactions=[];
  reactCounts:number=0;
  userReaction:string;
  displayFailSuccess:boolean = false;
  displayMessaageDialog:boolean = false;
  displayMessage:String;
  constructor (private postService:PostsService,private confirmationService: ConfirmationService) { }

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

  onDelete(){
    this.confirmationService.confirm({
       message: "Do you want to delete this post?",
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () => {
         this.postService.deletePost(this.postData.id).subscribe(()=>{
           this.displayMessage='Post deleted successfully..';
           this.displayFailSuccess=false;
           this.displayMessaageDialog = true;
           setTimeout(()=>{this.ngOnInit();},500);
         }
         ,err=>{
           this.displayMessage='Post delete failed...';
           this.displayFailSuccess=true;
           this.displayMessaageDialog = true;
         });
       },
       reject: () => {
       }
   });
  }
}
