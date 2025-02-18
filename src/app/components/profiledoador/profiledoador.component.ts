import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { Router, RouterLink } from '@angular/router';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { NgIf } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { User } from '../../user.interface';

@Component({
    selector: 'app-profiledoador',
    imports: [NavegacaoComponent, FooterComponent, RouterLink, NgIf, FormsModule],
    standalone: true,
    templateUrl: './profiledoador.component.html',
    styleUrl: './profiledoador.component.css'
})
export class ProfiledoadorComponent implements OnInit {

    success: string | null = null;
    error: string | null = null;

    user: User | null = null;
    userEmail: string = '';
    userUsername: string = '';
    userName: string = '';

    constructor(private location: Location, 
                private api: ApiService,
                private router: Router,
                private data: DataService) { }

    async ngOnInit(): Promise<void> {
        try {
            const next = await this.api.checkAuth().toPromise();
            this.data.getUser(next.id).subscribe({
                next: async (data: User) => {
                    this.user = data;
                    this.userEmail = data.email;
                    this.userUsername = data.username;
                    this.userName = data.first_name;
                }
            });
        } catch (error) {
            this.router.navigate(['/login']);
        }
    }

    goBack() {
        this.location.back();
    }

    updateAccount(data: NgForm) { }

    deleteAccount(data: NgForm) { 
        if (!data || !data.value) {
            this.success = null;
            this.error = "O formulário é vazio ou inválido.";
            return;
        }
        if (data.value.password == '') {
            this.success = null;
            this.error = 'Preencha a sua senha para deletar sua conta.';
            return;
        }
        this.api.deleteAccount(data.value.password).then((token) => {
            this.router.navigate(['/']);
          }).catch((error) => {
            this.success = null;
            this.error = error; 
          });
    }
}
