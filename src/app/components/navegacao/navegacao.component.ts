import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacao',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  providers:[],
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
