import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { Router, RouterLink } from '@angular/router';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { ModalComponent } from '../modal/modal.component';
import { NgIf } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { User } from '../../user.interface';

@Component({
    selector: 'app-profiledoador',
    imports: [NavegacaoComponent, FooterComponent, RouterLink, NgIf, FormsModule, ModalComponent],
    standalone: true,
    templateUrl: './profiledoador.component.html',
    styleUrl: './profiledoador.component.css'
})
export class ProfiledoadorComponent implements OnInit {

    success: string | null = null;

    errorUpdate: string | null = null;
    errorDelete: string | null = null;

    showModalUpdate: boolean = false;
    showModalDelete: boolean = false;

    loadingDelete: boolean = false;
    loadingPassword: boolean = false;

    changePassword: boolean = false;

    user: User | null = null;

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
                }
            });
        } catch (error) {
            this.router.navigate(['/login']);
        }
    }

    goBack() {
        this.location.back();
    }

    updateAccount(data: NgForm) { 
        if (!data || !data.value) {
            this.success = null;
            this.errorUpdate = "O formulário é vazio ou inválido.";
            return;
        }
        if (!data.value.username || !data.value.name || !data.value.email) {
            this.success = null;
            this.errorUpdate = 'Por favor, preencha todos os campos para atualizar seus dados.';
            return;
        }
        const post_data = {
            username: data.value.username || '',
            name: data.value.name || '',
            email: data.value.email || '',
            id: this.user!.id,
        };
        this.api.updateAccount(post_data).then((success) => {
            this.success = 'Dados atualizados com sucesso!';
            this.errorUpdate = null;
            this.closeModalUpdate();
        }).catch((error) => {
            this.success = null;
            this.errorUpdate = error.username;
        })
    }

    updatePassword(data: NgForm) { 
        this.loadingPassword = true;
        if (!data || !data.value) {
            this.success = null;
            this.errorUpdate = "O formulário é vazio ou inválido.";
            this.loadingPassword = false;
            return;
        }
        if (!data.value.newpassword || !data.value.confirmpassword || !data.value.password) {
            this.success = null;
            this.errorUpdate = 'Por favor, preencha todos os campos para atualizar seus dados.';
            this.loadingPassword = false;
            return;
        }
        if (data.value.newpassword !== data.value.confirmpassword) {
            this.success = null;
            this.errorUpdate = 'Senhas digitas são diferentes, tente novamente.';
            this.loadingPassword = false;
            return;
        }
        const post_data = {
            username: this.user!.username,
            password: data.value.newpassword || '',
            id: this.user!.id,
        };
        this.api.verifyPassword(data.value.password).then((success) => {
            this.api.updatePassword(post_data).then((success) => {
                this.success = 'Sua senha foi atualizada com sucesso!';
                this.errorUpdate = null;
                this.loadingPassword = false;
                this.closeModalUpdate();
            }).catch((error) => {
                this.success = null;
                this.loadingPassword = false;
                this.errorUpdate = 'Sua senha deve conter pelo menos 8 caracteres, contendo letras e números.';
            })
        }).catch((error) => {
            this.success = null;
            this.loadingPassword = false;
            this.errorUpdate = error.error;
        })
    }

    deleteAccount(data: NgForm) {
        this.loadingDelete = true;
        if (!data || !data.value) {
            this.success = null;
            this.loadingDelete = false;
            this.errorDelete = "O formulário é vazio ou inválido.";
            return;
        }
        if (data.value.password == '') {
            this.success = null;
            this.loadingDelete = false;
            this.errorDelete = 'Confirme a sua senha para apagar sua conta.';
            return;
        }
        this.api.deleteAccount(data.value.password).then((success) => {
            this.loadingDelete = false;
            this.router.navigate(['/']);
          }).catch((error) => {
            this.loadingDelete = false;
            this.success = null;
            this.errorDelete= error; 
          });
    }

    changeForm() {
        this.changePassword = !this.changePassword;
    }

    openModalUpdate() {
        this.showModalUpdate = true;
        this.changePassword = false;
    }
    
    closeModalUpdate() {
        this.showModalUpdate = false;
        this.errorUpdate = null;
    }

    openModalDelete() {
        this.showModalDelete = true;
    }
    
    closeModalDelete() {
        this.showModalDelete = false;
        this.errorDelete = null;
    }
}
