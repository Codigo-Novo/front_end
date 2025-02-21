import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-sobresite',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './sobresite.component.html',
  styleUrl: './sobresite.component.css'
})
export class SobresiteComponent {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
