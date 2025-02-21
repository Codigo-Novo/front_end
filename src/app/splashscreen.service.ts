import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  private splashElement: HTMLElement | null;

  constructor(private router: Router) {
    this.splashElement = document.getElementById('splash-screen');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.hide();
      }
    });
  }

  show() {
    if (this.splashElement) {
      this.splashElement.style.display = 'flex';
      this.splashElement.style.opacity = '1';
    }
  }

  hide() {
    if (this.splashElement) {
      setTimeout(() => {
        if (this.splashElement) { // Verifica novamente antes de acessar
          this.splashElement.style.opacity = '0';
          setTimeout(() => this.splashElement!.style.display = 'none', 500); // Use "!" se já tiver certeza de que não será nulo
        }
      }, 500);
    }
  }
}
