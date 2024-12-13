import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditaccountComponent } from './components/editaccount/editaccount.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { StartdoadorComponent } from './components/startdoador/startdoador.component';
import { StartinstituicaoComponent } from './components/startinstituicao/startinstituicao.component';
import { SignupinstituicaoComponent } from './components/signupinstituicao/signupinstituicao.component';


export const routes: Routes = [
    {
      path: "",
      title: 'Home',
      component: HomeComponent
    },
    {
      path: "login",
      title: 'Entrar',
      component: LoginComponent
    },
    {
      path: "signup",
      title: 'Cadastrar-se',
      component: SignupComponent
    },
    {
      path: "editaccount",
      title: 'Editar conta',
      component: EditaccountComponent
    },
    {
      path: "deleteaccount",
      title: 'Deletar conta',
      component: DeleteaccountComponent
    },
    {

      path: "startdoador",
      title: 'Página de início',
      component: StartdoadorComponent
    },
    {
      path: "startinstituicao",
      title: 'Página de início',
      component: StartinstituicaoComponent
    },
    {
      path: "signupinstituicao",
      title: 'Cadastrar Instituição',
      component: SignupinstituicaoComponent
    }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
