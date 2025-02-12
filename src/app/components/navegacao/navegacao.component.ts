import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navegacao',
    imports: [RouterLink],
    providers: [],
    standalone: true,
    templateUrl: './navegacao.component.html',
    styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {
  constructor(private api: ApiService, private router: Router) { }

  async logout() {
    await this.api.logout();
    this.router.navigate(['/']);
  }
}
