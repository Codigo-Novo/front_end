import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-editaccount',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './editaccount.component.html',
    styleUrl: './editaccount.component.css'
})
export class EditaccountComponent {

}
