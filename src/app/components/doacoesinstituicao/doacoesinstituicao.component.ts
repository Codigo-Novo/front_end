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

@Component({
  selector: 'app-doacoesinstituicao',
  standalone: true,
  imports: [NavinstituicaoComponent, FooterComponent, CommonModule, NgxPaginationModule, RouterLink],
  templateUrl: './doacoesinstituicao.component.html',
  styleUrl: './doacoesinstituicao.component.css'
})
export class DoacoesinstituicaoComponent implements OnInit {

  donationsData: DonationsResponse = { user: '', total_donations: 0, redeemed_donations: 0, donations: [] };
  currentPage: number = 1;

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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta para o topo com efeito suave
  }
}
