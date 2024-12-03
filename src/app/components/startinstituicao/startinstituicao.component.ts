import { Component } from '@angular/core';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-startinstituicao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent],
  templateUrl: './startinstituicao.component.html',
  styleUrl: './startinstituicao.component.css'
})
export class StartinstituicaoComponent {

}
