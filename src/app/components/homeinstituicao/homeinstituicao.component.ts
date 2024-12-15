import { Component } from '@angular/core';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";
import { NavinstituicaoComponent } from "../navinstituicao/navinstituicao.component";

@Component({
  selector: 'app-startinstituicao',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, NavinstituicaoComponent],
  templateUrl: './homeinstituicao.component.html',
  styleUrl: './homeinstituicao.component.css'
})
export class HomeinstituicaoComponent {

}
