import { Component } from '@angular/core';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-startinstituicao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent],
  templateUrl: './homeinstituicao.component.html',
  styleUrl: './homeinstituicao.component.css'
})
export class HomeinstituicaoComponent {

}
