import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-navinstituicao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navinstituicao.component.html',
  styleUrl: './navinstituicao.component.css'
})
export class NavinstituicaoComponent {

  constructor(private api: ApiService, private router: Router) { }
  logout() {

    this.api.logout();
    this.router.navigate(['/']);
  }
}
