import { Component, OnInit } from '@angular/core';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Institution } from '../../institution.interface';
import { KeyWord } from '../../keyword.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginainstituicao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, CommonModule],
  templateUrl: './paginainstituicao.component.html',
  styleUrl: './paginainstituicao.component.css'
})
export class PaginainstituicaoComponent implements OnInit {

  userId: string | null = null;
  institution: Institution | null = null;
  keywords: KeyWord[] = [];

  constructor(private route: ActivatedRoute, 
              private data: DataService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.institution = await this.getInstitution(<number><unknown>this.userId);
      this.institution.keywords.forEach(async (keyword) => {
        this.keywords.push(await this.getKeyword(keyword))
      })
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  getInstitution(id: number): Promise<Institution> {
    return new Promise((resolve, reject) => {
      this.data.getInstitution(id).subscribe(
        (data: Institution) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  getKeyword(id: number): Promise<KeyWord> {
    return new Promise((resolve, reject) => {
      this.data.getKeyWord(id).subscribe(
        (data: KeyWord) => resolve(data),
        (error) => reject(error)
      );
    });
  }
}
