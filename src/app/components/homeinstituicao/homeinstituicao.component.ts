
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { KeyWord } from '../../keyword.interface';
import { Institution } from '../../institution.interface';
import { OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavinstituicaoComponent } from "../navinstituicao/navinstituicao.component";

@Component({
  selector: 'app-homeinstituicao',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule, NgSelectModule, NavinstituicaoComponent, RouterLink],
  templateUrl: './homeinstituicao.component.html',
  styleUrl: './homeinstituicao.component.css'
})
export class HomeinstituicaoComponent implements OnInit {

  keywords: KeyWord[] = [];
  selectedKeyword: KeyWord | null = null;
  otherKeyword: string = '';

  username: string | null = null;
  institution: Institution | null = null;
  institutionKeywords: KeyWord[] = [];
  selectedInstitutionKeyword: KeyWord | null = null;

  error: string | null = null;
  success: string | null = null;

  constructor(private api: ApiService, private data: DataService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    /*try {
      const next = await this.api.checkInstitution().toPromise();
      this.username = next.username;
      this.institution = await this.getInstitution(next.id);
      this.keywords = await this.getKeywords();
      this.keywords.push({ id: -1, name: 'Outro' });
      if (!this.selectedKeyword) {
        this.selectedKeyword = null;
      }
      this.institutionKeywords = this.keywords.filter(item => this.institution!.keywords.includes(item.id));
    } catch (error) {
      this.router.navigate(['/login']);
    }*/
  }
  
  getInstitution(id: number): Promise<Institution> {
    return new Promise((resolve, reject) => {
      this.data.getInstitution(id).subscribe(
        (data: Institution) => resolve(data),
        (error) => reject(error)
      );
    });
  }
 
  getKeywords(): Promise<KeyWord[]> {
    return new Promise((resolve, reject) => {
      this.data.getKeyWords().subscribe(
        (data: KeyWord[]) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  onKeywordChange(selectedValue: KeyWord) {
    if (selectedValue && selectedValue.id === -1) {
      this.selectedKeyword = { id: -1, name: 'Outro' }; 
    } else {
      this.selectedKeyword = selectedValue;
    }
  }

  onKeywordChangeRemoval(selectedValue: KeyWord) {
    if (selectedValue && selectedValue.id === -1) {
      this.selectedInstitutionKeyword = { id: -1, name: 'Outro' }; 
    } else {
      this.selectedInstitutionKeyword = selectedValue;
    }
  }

  compareKeywords(option: KeyWord, value: KeyWord): boolean {
    return option?.id === value?.id;
  }

  async addKeyWord(data: NgForm) {
    if (!data || !data.value) {
      this.success = '';
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    if (this.selectedKeyword == null) {
      this.success = '';
      this.error = "Por favor, selecione uma palavra-chave para adicionar.";
      return;
    }
    const post_data = {
      institutionUsername : this.username || '',
      keywordId : data.value.keywordId.id || '',
    }
    this.api.addKeyWordInstitution(post_data).then((success) => {
      if (success) {
        this.error = '';
        this.success = `Palavra-chave ${data.value.keywordId.name} adicionada com sucesso à sua instituição.`;
        this.ngOnInit();
      } else {
        this.success = '';
        this.error = `Erro ao adicionar palavra-chave ${data.value.keywordId.name} à sua instituição.`;
      }
    });
  }

  async createKeyWord(data: NgForm) {
    if (!data || !data.value) {
      this.success = '';
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    const post_data = {
      keywordName: data.value.otherKeyword || '',
    }
    this.api.createKeyWord(post_data).then((success) => {
      if (success) {
        this.error = '';
        this.success = `Palavra-chave ${data.value.otherKeyword} criada com sucesso!`;
        //this.ngOnInit();
      } else {
        this.success = '';
        this.error = `Erro ao criar palavra-chave ${data.value.otherKeyword}.`;
      }
    });
  }

  async removeKeyWord(data: NgForm) {
    if (!data || !data.value) {
      this.success = '';
      this.error = "O formulário é vazio ou inválido.";
      return;
    }
    if (this.selectedInstitutionKeyword == null) {
      this.success = '';
      this.error = "Por favor, selecione uma palavra-chave para remover.";
      return;
    }
    const post_data = {
      institutionUsername : this.username || '',
      keywordId : data.value.keywordId.id || '',
    }
    this.api.removeKeyWordInstitution(post_data).then((success) => {
      if (success) {
        this.error = '';
        this.success = `Palavra-chave ${data.value.keywordId.name} removida com sucesso da sua instituição.`;
        this.ngOnInit();
        this.selectedInstitutionKeyword = null;
      } else {
        this.success = '';
        this.error = `Erro ao remover palavra-chave ${data.value.keywordId.name} da sua instituição.`;
      }
    });
  }
}

