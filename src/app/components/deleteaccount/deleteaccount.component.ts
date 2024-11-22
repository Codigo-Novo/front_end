import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-deleteaccount',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './deleteaccount.component.html',
  styleUrl: './deleteaccount.component.css'
})
export class DeleteaccountComponent {

}
