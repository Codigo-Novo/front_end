import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  error: any;

  constructor(private api: ApiService, private router: Router) { }
  submitData(data: NgForm) {
    console.log('Data:', data);
  }
  async donator(data: NgForm) {
    if (!data || !data.value) {
      console.error('O formulário é inválido ou vazio:', data);
      return;
    }
    if (data.value.password !== data.value.confirm) {
      console.log('Senhas digitadas diferentes!');
    } else {
      this.api.createUser(data.value).then((success) => {
        if (success) {
          this.api.defineDonator(data.value.username);
          this.router.navigate(['/']);
        } else {
          console.error('Erro ao criar conta.');
        }
      });
    }
  }
  async institution(data: NgForm) {
    if (!data || !data.value) {
      console.error('O formulário é inválido ou vazio:', data);
      return;
    }
    if (data.value.password !== data.value.confirm) {
      console.log('Senhas digitadas diferentes!');
    } else {
      this.api.createUser(data.value).then((success) => {
        if (success) {
          this.api.defineInstitution(data.value.username);
          this.router.navigate(['/signupinstituicao']);
        } else {
          console.error('Erro ao criar conta.');
        }
      });
    }
  }
}
