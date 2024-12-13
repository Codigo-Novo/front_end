import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { GeolocationService } from './geolocation.service';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [
    ApiService,
    DataService,
    GeolocationService,
  ],
})

export class AppModule {}