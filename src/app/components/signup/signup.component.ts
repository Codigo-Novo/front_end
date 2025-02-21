import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
    selector: 'app-signup',
    imports: [HeaderComponent, FooterComponent, FormsModule, RouterLink, NgIf],
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})

export class SignupComponent {

  error: string | null = null;
  loadingDonator: boolean = false;
  loadingInstitution: boolean = false;

  constructor(private api: ApiService, 
              private router: Router, 
              private location: Location) { }
  
  submitData(data: NgForm) { }

  async donator(data: NgForm) {
    this.loadingDonator = true;
    if (!data || !data.value) {
      this.error = 'O formulário é inválido ou vazio:';
      this.loadingDonator = false;
      return;
    }
    if (!data.value.username || !data.value.name || !data.value.email || !data.value.password || !data.value.confirm) {
      this.error = 'Preencha todos os campos para continuar.';
      this.loadingDonator = false;
      return;
    }
    if (data.value.password !== data.value.confirm) {
      this.error = 'Senhas digitadas são diferentes!';
      this.loadingDonator = false;
    } else {
      await this.api.createUser(data.value).then((success) => {
          this.api.defineDonator(data.value.username);
          this.loadingDonator = false;
          this.router.navigate(['/homedoador']);
        }).catch((error) => {
          this.loadingDonator = false;
          if (error.username) {
            this.error = error.username;
          } else if (error.password) {
            this.error = 'Sua senha deve conter pelo menos 8 caracteres, contendo letras e números.';
          }
      });
    }
  }
  
  async institution(data: NgForm) {
    this.loadingInstitution = true;
    if (!data || !data.value) {
      this.error = 'O formulário é inválido ou vazio:';
      this.loadingInstitution = false;
      return;
    }
    if (!data.value.username || !data.value.name || !data.value.email || !data.value.password || !data.value.confirm) {
      this.error = 'Preencha todos os campos para continuar.';
      this.loadingInstitution = false;
      return;
    }
    if (data.value.password !== data.value.confirm) {
      this.error = 'Senhas digitadas são diferentes!';
      this.loadingInstitution = false;
    } else {
      await this.api.createUser(data.value).then(async (success) => {
        await this.api.defineInstitution(data.value.username)
        this.loadingInstitution = false;
        this.router.navigate(['/signupinstituicao']);
        }).catch((error) => {
          this.loadingInstitution = false;
          if (error.username) {
            this.error = error.username;
          } else if (error.password) {
            this.error = 'Sua senha deve conter pelo menos 8 caracteres, contendo letras e números.';
          }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
