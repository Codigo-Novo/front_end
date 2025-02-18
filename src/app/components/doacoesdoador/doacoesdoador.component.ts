import { Component, OnInit } from '@angular/core';
import { DonationsResponse } from '../../donation.interface';
import { ApiService } from '../../api.service';
import { DonationService } from '../../donation.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doacoesdoador',
  imports: [NavegacaoComponent, FooterComponent, NgxPaginationModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './doacoesdoador.component.html',
  styleUrl: './doacoesdoador.component.css'
})
export class DoacoesdoadorComponent implements OnInit {
  
  donationsData: DonationsResponse = { user: '', total_donations: 0, redeemed_donations: 0, donations: [] };
  currentPage: number = 1;

  constructor(private location: Location, 
              private api: ApiService,
              private donation: DonationService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.api.checkAuth().toPromise();
      this.donation.getDonatorDonations().subscribe({
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
