import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: string | null = null;

  constructor(private api: ApiService, private router: Router) { }

  async submitData(data: NgForm) {
    if (!data || !data.value) {
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    if (!data.value.username || !data.value.password) {
      this.error = "Preencha todos os campos.";
      return;
    }
    this.api.checkAuth().subscribe({
      next: (response) => {
        this.error = "Usuário já está autenticado.";
      },
      error: (error) => {
        this.api.login(data.value).then((success) => {
          if (success) {
            this.router.navigate(['/']);
            this.error = null;
          } else {
            this.error = "Credenciais inválidas.";
          }
        });
      }
    });
  }
}
