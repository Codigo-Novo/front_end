import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
  imgpath: string = 'assets/logo.jpg';  // Caminho da imagem
  title = 'firt_test';
  
}
