import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, HeaderComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: string | null = null;
  loading: boolean = false;

  constructor(private api: ApiService, private router: Router, private location: Location) { }

  async submitData(data: NgForm) {
    this.loading = true;
    if (!data || !data.value) {
      this.error = "O formulário é vazio ou inválido.";
      this.loading = false;
      return;
    }
    if (!data.value.username || !data.value.password) {
      this.error = "Preencha todos os campos.";
      this.loading = false;
      return;
    }
    this.api.checkAuth().subscribe({
      next: (response) => {
        this.error = "Usuário já está autenticado.";
        this.loading = false;
      },
      error: (error) => {
        this.api.login(data.value).then((success) => {
          if (success) {
            this.api.checkInstitution().subscribe({
              next: (value) => {
                this.loading = false;
                this.router.navigate(['/homeinstituicao'])
              },
              error: (error) => {
                this.loading = false;
                this.router.navigate(['/homedoador'])
              }
            })
          } else {
            this.loading = false;
            this.error = "Nome de usuário ou senha incorretos. Tente novamente.";
          }
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
