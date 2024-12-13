import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApoioadoacaoComponent } from './components/apoioadoacao/apoioadoacao.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditaccountComponent } from './components/editaccount/editaccount.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { HomedoadorComponent } from './components/homedoador/homedoador.component';
import { HomeinstituicaoComponent } from './components/homeinstituicao/homeinstituicao.component';
import { SignupinstituicaoComponent } from './components/signupinstituicao/signupinstituicao.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileinstituicaoComponent } from './components/profileinstituicao/profileinstituicao.component';
import { ProfiledoadorComponent } from './components/profiledoador/profiledoador.component';
import { CarouselComponent } from './components/carousel/carousel.component';

export const routes: Routes = [
    {
      path: "",
      title: 'Apoio a Doação',
      component: ApoioadoacaoComponent
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
      path: "homedoador",
      title: 'Página Home',
      component: HomedoadorComponent
    },
    {
      path: "homeinstituicao",
      title: 'Página de início',
      component: HomeinstituicaoComponent
    },
    {
      path: "signupinstituicao",
      title: 'Cadastrar Instituição',
      component: SignupinstituicaoComponent
    },
    {
      path: "about",
      title: 'Sobre o site',
      component: AboutComponent
    },
    {
      path: "profileinstituicao",
      title: 'Perfil',
      component: ProfileinstituicaoComponent
    },
    {
      path: "profiledoador",
      title: 'Perfil',
      component: ProfiledoadorComponent
    },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
