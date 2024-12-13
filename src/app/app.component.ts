import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  

})

export class AppComponent {
  imgpath: string = 'https://i.pinimg.com/236x/2b/1b/73/2b1b735acb27d594d03d968d282fa14a.jpg';  // Caminho da imagem
  title = 'firt_test';
  
}
