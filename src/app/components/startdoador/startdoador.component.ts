import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-startdoador',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterOutlet, NavegacaoComponent, FooterComponent],
  templateUrl: './startdoador.component.html',
  styleUrl: './startdoador.component.css'
})
export class StartdoadorComponent {

}
