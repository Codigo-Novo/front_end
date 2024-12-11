import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupinstituicao',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './signupinstituicao.component.html',
  styleUrl: './signupinstituicao.component.css'
})
export class SignupinstituicaoComponent {
  inst: string | null = null;

  constructor(private api: ApiService, private router: Router) { }

  submitData(data: NgForm) {
    if (!data || !data.value) {
      console.error('O formulário é inválido ou vazio:', data);
      return;
    }
    const post_data = {
      description: data.value.description,
      cpforcnpj: data.value.cpforcnpj,
      lat: data.value.lat,
      long: data.value.long,
    }
    this.api.createInstitution(post_data).then((success) => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        console.error('Erro ao criar conta.');
      }
    });
  }
}
