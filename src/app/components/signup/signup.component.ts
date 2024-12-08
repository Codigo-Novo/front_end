import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  error: any;

  constructor(private api: ApiService) { }

  submitData(data: NgForm) {
    console.log('Data:', data);

    if (!data || !data.value) {
        console.error('O formulário é inválido ou vazio:', data);
        return;
    }

    if (data.value.password !== data.value.confirm) {
        console.log('Senhas digitadas diferentes!');
    } else {
        console.log('Dados válidos. Enviando para API:', data.value);
        this.api.createUser(data.value);
    }
  }
}
