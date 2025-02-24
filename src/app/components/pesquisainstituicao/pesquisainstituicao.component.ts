import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';
import { KeyWord } from '../../keyword.interface';
import { Institution } from '../../institution.interface';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-pesquisainstituicao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './pesquisainstituicao.component.html',
  styleUrl: './pesquisainstituicao.component.css'
})
export class PesquisainstituicaoComponent implements OnInit {

  keywordId: string | null = null;
  keyword: KeyWord | null = null;
  institutions: Institution[] = [];
  found: boolean = true;

  constructor(private route: ActivatedRoute, private data: DataService, private location: Location) { }

  async ngOnInit(): Promise<void> {
    try {
      this.keywordId = this.route.snapshot.paramMap.get('id');
      this.keyword = await this.getKeyword(<number><unknown>this.keywordId);
      this.data.getInstitutions().subscribe({
        next: async (data: Institution[]) => {
          this.institutions = data.filter(institution => institution.is_active);        
          this.institutions = data.filter(item => item.keywords.includes(Number(this.keywordId)));
        },
        error: (error) => {
          console.error("Erro: ", error);
        },
      });
    } catch (error) {
      this.found = false;
    }
  }

  getKeyword(id: number): Promise<KeyWord> {
    return new Promise((resolve, reject) => {
      this.data.getKeyWord(id).subscribe(
        (data: KeyWord) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  goBack() {
    this.location.back();
  }
}
