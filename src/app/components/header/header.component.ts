import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  imgpath: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7QDxdPUJrphv3FzWyVCw1uvO5jOMhTyNZQ&s';  // Caminho da imagem
}