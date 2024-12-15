import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-apoioadoacao',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CarouselComponent, RouterLink],
  providers:[],
  templateUrl: './apoioadoacao.component.html',
  styleUrl: './apoioadoacao.component.css'
})

export class ApoioadoacaoComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
      this.api.checkAuth().subscribe(
        (success) => {
          this.api.checkInstitution().subscribe(
            (success) => {
              this.router.navigate(['/homeinstituicao']);
            }, (error) => {
              this.router.navigate(['/homedoador']);
          })
      })
  }

}
