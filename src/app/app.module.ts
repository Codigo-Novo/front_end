import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ApiService } from './api.service'; // Serviço

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [
    ApiService,
  ],
})

export class AppModule {}