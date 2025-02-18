import { Component, OnInit } from '@angular/core';
import { Location,NgIf } from '@angular/common';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { DonationService } from '../../donation.service';

@Component({
  selector: 'app-resgatardoacao',
  imports: [NavegacaoComponent, FooterComponent, FormsModule, NgIf],
  standalone: true,
  templateUrl: './resgatardoacao.component.html',
  styleUrl: './resgatardoacao.component.css'
})
export class ResgatardoacaoComponent implements OnInit {

  success: string | null = null;
  error: string | null = null;

  constructor (private location: Location,
               private api: ApiService,
               private router: Router,
               private donation: DonationService) { }

  async ngOnInit(): Promise<void> {
    try {
      const next = await this.api.checkAuth().toPromise();
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  goBack() {
    this.location.back();
  }

  redeemDonation(data: NgForm) { 
    if (!data || !data.value) {
      this.success = null;
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    if (data.value.token == '') {
      this.success = null;
      this.error = 'Preencha o campo do token.';
      return;
    }
    this.donation.redeemToken(data.value.token).then((message) => {
      this.error = null;
      this.success = message;
    }).catch((error) => {
      this.success = null;
      this.error = error; 
    });
  }
}
