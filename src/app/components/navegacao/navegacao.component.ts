import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-navegacao',
    imports: [RouterLink, ModalComponent],
    providers: [],
    standalone: true,
    templateUrl: './navegacao.component.html',
    styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private api: ApiService, private router: Router) { }

  async logout() {
    await this.api.logout();
    this.router.navigate(['/']);
  }
}
