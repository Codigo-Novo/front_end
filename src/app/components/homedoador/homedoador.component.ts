import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";
import { WordCloudComponent } from "../word-cloud/word-cloud.component";


@Component({
  selector: 'app-startdoador',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterOutlet, NavegacaoComponent, FooterComponent, WordCloudComponent],
  templateUrl: './homedoador.component.html',
  styleUrl: './homedoador.component.css'
})
export class HomedoadorComponent {

}
