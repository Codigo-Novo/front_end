import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {
      path: "",
      title: 'Home Page',
      component: HomeComponent
    },
    {
      path: "login",
      title: 'Login Page',
      component: LoginComponent
    },
    {
      path: "signup",
      title: 'Signup Page',
      component: SignupComponent
    },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
