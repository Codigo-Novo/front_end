import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [NgOptimizedImage],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  imgpath: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7QDxdPUJrphv3FzWyVCw1uvO5jOMhTyNZQ&s';  // Caminho da imagem
}