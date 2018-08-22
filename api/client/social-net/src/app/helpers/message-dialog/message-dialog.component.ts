import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {


  @Input() displayFailSuccess:boolean;
  @Input() displayMessaageDialog:boolean;
  @Input() displayMessage:String;
  header:String;
  iconClass:String;
  buttonLabel:String;
  buttonIcon:String;
  constructor() { }

  ngOnInit() {
  }

  close(){
    this.displayMessaageDialog=false;
  }

  onShow(){
    if(this.displayFailSuccess){
      this.header="Error";
      this.iconClass="far fa-frown";
      this.buttonLabel="Try Again";
      this.buttonIcon="fas fa-redo";
    }
    if(!this.displayFailSuccess)
    {
      this.header="Success";
      this.iconClass="far fa-smile";
      this.buttonLabel="Continue";
      this.buttonIcon="fas fa-angle-double-right";
    }
  }

}
