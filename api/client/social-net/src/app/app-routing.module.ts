import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SignupComponent } from './component/signup/signup.component';


@NgModule({
  exports: [ RouterModule ]
})
const routes: Routes = [
  { path: '/', component: LoginComponent },
  { path: '/home', component: HomeComponent },
  { path: '/profile/{id}', component: ProfileComponent },
  { path: '/signup', component: SignupComponent },

];
export class AppRoutingModule {}
