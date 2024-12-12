import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacao',
  standalone: true,
  imports: [],
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {
  constructor(private api: ApiService, private router: Router) { }

  logout() {
    this.api.logout();
    this.router.navigate(['/']);
  }
}
