import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [routerTransition()]
})
export class NotFoundComponent implements OnInit {

  constructor(private location: Location,private router:Router) { }

  ngOnInit() {
  }

  back(){
    if (sessionStorage.getItem('isLoggedin'))
        this.router.navigateByUrl('/home');
    else this.router.navigateByUrl('/');
    }


}
