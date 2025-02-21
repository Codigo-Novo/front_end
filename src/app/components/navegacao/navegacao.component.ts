import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ModalComponent } from "../modal/modal.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-navegacao',
    imports: [RouterLink, ModalComponent, NgIf],
    providers: [],
    standalone: true,
    templateUrl: './navegacao.component.html',
    styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {

  showModal: boolean = false;
  logged_in: boolean = false;

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit() {
    const next = await this.api.checkAuth().toPromise();
    this.logged_in = next.authenticated;
  }

  async logout() {
    await this.api.logout();
    this.router.navigate(['/']);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
