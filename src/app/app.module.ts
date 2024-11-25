import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service'; // Serviço

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    ApiService,
  ],
})

export class AppModule {}