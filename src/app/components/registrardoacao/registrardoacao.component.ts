import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { NgForm, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../donation.service';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Registrardoacao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, FormsModule, NgIf],
  templateUrl: './registrardoacao.component.html',
  styleUrl: './registrardoacao.component.css'
})
export class RegistrardoacaoComponent implements OnInit {

  id: number | null = null;

  token: string | null = null;

  success: string | null = null;
  error: string | null = null;

  constructor(private location: Location, 
              private donation: DonationService,
              private api: ApiService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const next = await this.api.checkInstitution().toPromise();
      this.id = next.id;
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  createDonation(data: NgForm) {
    if (!data || !data.value) {
      this.token = null;
      this.success = '';
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    if (data.value.description == '') {
      this.success = '';
      this.error = 'Preencha a descrição da doação.';
      return;
    }
    if (data.value.user) {
      const post_data = {
        institution : this.id || 0,
        donator: data.value.user || '',
        description : data.value.description || '',
      }
      this.donation.generateDonation(post_data).then((token) => {
        this.token = token;
        this.error = '';
        this.success = `Token de doação gerado e associado com o usuário com sucesso! Token: ${this.token}`;
      }).catch((error) => {
        this.token = null;
        this.success = '';
        this.error = error; 
      });
    } else {
      const post_data = {
        institution : this.id || 0,
        description : data.value.description || '',
      }
      this.donation.generateToken(post_data).then((token) => {
        this.token = token;
        this.error = '';
        this.success = `Token de doação gerado com sucesso! Token: ${this.token}`;
      }).catch((error) => {
        this.token = null;
        this.success = '';
        this.error = 'Erro ao gerar token.'; 
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
