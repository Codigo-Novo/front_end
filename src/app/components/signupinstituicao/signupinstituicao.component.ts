import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signupinstituicao',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './signupinstituicao.component.html',
  styleUrl: './signupinstituicao.component.css'
})
export class SignupinstituicaoComponent {
  constructor(private api: ApiService) { }
}
