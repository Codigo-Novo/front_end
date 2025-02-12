import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-sobresite',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './sobresite.component.html',
  styleUrl: './sobresite.component.css'
})
export class SobresiteComponent {

}
