import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashScreenService } from './splashscreen.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private splashScreenService: SplashScreenService) {}

  imgpath: string = 'assets/logo.jpg';  // Caminho da imagem
  title = 'firt_test';
  
}
