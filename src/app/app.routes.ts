import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditaccountComponent } from './components/editaccount/editaccount.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { MapComponent } from './components/map/map.component';

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
    {
      path: "editaccount",
      title: 'Edit Page',
      component: EditaccountComponent
    },
    {
      path: "deleteaccount",
      title: 'Delete Page',
      component: DeleteaccountComponent
    },
    {
      path: "map",
      title: 'Map',
      component: MapComponent
    },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
