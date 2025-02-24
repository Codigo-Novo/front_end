import { NavinstituicaoComponent } from '../navinstituicao/navinstituicao.component';
import { FooterComponent } from '../footer/footer.component';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DonationsResponse } from '../../donation.interface';
import { DonationService } from '../../donation.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from "../modal/modal.component";
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doacoesinstituicao',
  standalone: true,
  imports: [NavinstituicaoComponent, FooterComponent, CommonModule, NgxPaginationModule, RouterLink, ModalComponent, FormsModule],
  templateUrl: './doacoesinstituicao.component.html',
  styleUrl: './doacoesinstituicao.component.css'
})
export class DoacoesinstituicaoComponent implements OnInit {

  errorEdit: string | null = null;
  errorDelete: string | null = null;
  success: string | null = null;

  donationsData: DonationsResponse = { user: '', total_donations: 0, redeemed_donations: 0, donations: [] };
  currentPage: number = 1;

  showModalEdit: boolean = false;
  showModalDelete: boolean = false;
  selectedDonation: number | null = null;
  descriptionDonation: string | null = null;

  constructor(private location: Location, 
              private api: ApiService,
              private donation: DonationService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.api.checkInstitution().toPromise();
      this.donation.getInstitutionDonations().subscribe({
        next: async (data: DonationsResponse) => {
          this.donationsData = data;
        }
      });
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  goBack() {
    this.location.back();
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModalEdit(id: number, description: string) {
    this.showModalEdit = true;
    this.selectedDonation = id;
    this.descriptionDonation = description;
  }

  closeModalEdit() {
    this.showModalEdit = false;
    this.selectedDonation = null;
    this.descriptionDonation = null;
    this.errorEdit = null;
  }

  openModalDelete(id: number) {
    this.showModalDelete = true;
    this.selectedDonation = id;
  }

  closeModalDelete() {
    this.showModalDelete = false;
    this.selectedDonation = null;
    this.errorDelete = null;
  }

  editDonation(id: number, data: NgForm) {
    if (!data || !data.value) {
      this.success = null;
      this.errorEdit = "O formulário é vazio ou inválido.";
      return;
    }
    if (!data.value.description) {
      this.success = null;
      this.errorEdit = 'Por favor, preencha a descrição para editar a doação.';
      return;
    }
    const post_data = {
      description: data.value.description || '',
      id: Number(id),
    };
    this.donation.editDonation(post_data).then((success) => {
      this.ngOnInit();
      this.success = success;
      this.errorEdit = null;
      this.closeModalEdit();
    }).catch((error) => {
      this.success = null;
      this.errorEdit = 'Erro ao editar doação.';
    })
  }

  deleteDonation(id: number) {
    this.donation.deleteDonation(id).then((success) => {
      this.ngOnInit();
      this.success = success;
      this.errorEdit = null;
      this.closeModalDelete();
    }).catch((error) => {
      this.success = null;
      this.errorEdit = 'Erro ao excluir doação.';
    })
  }
}
