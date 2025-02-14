import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { GeolocationService } from './geolocation.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    NgSelectModule,
    NgxPaginationModule,
  ],
  providers: [
    ApiService,
    DataService,
    GeolocationService,
  ],
})

export class AppModule {}