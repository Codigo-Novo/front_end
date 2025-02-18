import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-navinstituicao',
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: './navinstituicao.component.html',
  styleUrl: './navinstituicao.component.css'
})
export class NavinstituicaoComponent {

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private api: ApiService, private router: Router) { }
  async logout() {
    //await this.api.logout();
    this.router.navigate(['/']);
  }
}
