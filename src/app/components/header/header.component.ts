import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  imgpath: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_35T28oqJIpEBumfnU_QuRmHi5hT7nKXYUw&s';  // Caminho da imagem
}