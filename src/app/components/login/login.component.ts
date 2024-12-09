import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: any;

  constructor(private api: ApiService, private router: Router) { }

  async submitData(data: NgForm) {
    if (!data || !data.value) {
      console.error('O formulário é inválido ou vazio.');
      return;
    }
    this.api.checkAuth().subscribe({
      next: (response) => {
        console.log("Usuário já está autenticado.");
      },
      error: (error) => {
        this.api.login(data.value).then((success) => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.error = "Credenciais inválidas.";
          }
        });
      }
    });
  }

  logout() {
    this.api.logout();
  }
}
