import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  // Imagens ou itens do carousel
  images = ['img_doacao.png','aperto_mao.png', 'alimentos.jpg', 'sangue.jpg'];
  
  currentIndex = 0;
  intervalId: any;
  autoRotate = true;
  rotateInterval = 3000; // Tempo de rotação automática (em ms)

  constructor() { }

  ngOnInit(): void {
    if (this.autoRotate) {
      this.startAutoRotation();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Função para iniciar rotação automática
  startAutoRotation() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, this.rotateInterval);
  }

  // Função para ir para a próxima imagem
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Função para ir para a imagem anterior
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Função para pausar rotação automática
  toggleAutoRotate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.startAutoRotation();
    }
  }
}
