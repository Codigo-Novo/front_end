import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgIf, ModalComponent],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

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