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
import { ProfileinstituicaoComponent } from './components/profileinstituicao/profileinstituicao.component';
import { ProfiledoadorComponent } from './components/profiledoador/profiledoador.component';
import { PaginainstituicaoComponent } from './components/paginainstituicao/paginainstituicao.component';
import { PesquisainstituicaoComponent } from './components/pesquisainstituicao/pesquisainstituicao.component';
import { SobresiteComponent } from './components/sobresite/sobresite.component';
import { RegistrardoacaoComponent } from './components/registrardoacao/registrardoacao.component';
import { DoacoesinstituicaoComponent } from './components/doacoesinstituicao/doacoesinstituicao.component';
import { ResgatardoacaoComponent } from './components/resgatardoacao/resgatardoacao.component';
import { DoacoesdoadorComponent } from './components/doacoesdoador/doacoesdoador.component';

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
      title: 'Página de início',
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
      path: "profileinstituicao",
      title: 'Perfil',
      component: ProfileinstituicaoComponent
    },
    {
      path: "profiledoador",
      title: 'Perfil',
      component: ProfiledoadorComponent
    },
    {
      path: "signupinstituicao",
      title: 'Cadastrar Instituição',
      component: SignupinstituicaoComponent
    },
    {
      path: "signupinstituicao",
      title: 'Cadastrar Instituição',
      component: SignupinstituicaoComponent
    },
    {
      path: "paginainstituicao/:id",
      title: 'Instituição',
      component: PaginainstituicaoComponent
    },
    {
      path: "pesquisainstituicao/:id",
      title: 'Pesquisa Instituição',
      component: PesquisainstituicaoComponent

    },
    {
      path: "sobresite",
      title: 'Sobre o site',
      component: SobresiteComponent
    },
    {
      path: "registrardoacao",
      title: 'Registrar doação',
      component: RegistrardoacaoComponent
    },
    {
      path: "doacoesinstituicao",
      title: 'Doações',
      component: DoacoesinstituicaoComponent
    },
    {
      path: "resgatardoacao",
      title: 'Resgatar doação',
      component: ResgatardoacaoComponent
    },
    {
      path: "doacoesdoador",
      title: 'Doações',
      component: DoacoesdoadorComponent
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
