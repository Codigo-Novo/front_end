import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-apoioadoacao',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CarouselComponent, RouterLink, RouterOutlet],
  providers:[],
  templateUrl: './apoioadoacao.component.html',
  styleUrl: './apoioadoacao.component.css'
})

export class ApoioadoacaoComponent {

}
