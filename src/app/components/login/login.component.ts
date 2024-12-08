import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: any;

  constructor(private api: ApiService) { }

  submitData(data: NgForm) {
    console.log('Data:', data);

    if (!data || !data.value) {
        console.error('O formulário é inválido ou vazio:', data);
        return;
    }
    
    console.log('Dados válidos. Enviando para API:', data.value);
    this.api.login(data.value);
  }
}
