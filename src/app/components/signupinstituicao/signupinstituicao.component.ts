import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../api.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeolocationService } from '../../geolocation.service';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-signupinstituicao',
    imports: [FooterComponent, HeaderComponent, FormsModule, GoogleMapsModule, NgIf],
    standalone: true,
    templateUrl: './signupinstituicao.component.html',
    styleUrl: './signupinstituicao.component.css'
})
export class SignupinstituicaoComponent implements OnInit {
  
  error: string = '';
  address: string = '';

  loading: boolean = false;

  coordinates: { lat: number, lng: number } | null = null;
  map: google.maps.Map | null = null;
  markers: google.maps.Marker[] = [];
  options: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 16,
  };

  constructor(private api: ApiService, 
              private router: Router,
              private geolocation: GeolocationService) { }

  startMap() {
    var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
    this.map = map;
  }
  
  removeAllMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.address = target.value;
    this.removeAllMarkers();

    if (!this.address || this.address.trim() === '') {
      console.error('Endereço inválido.');
      return;
    }
    this.geolocation.getCoordinates(this.address)
      .then(coords => {
        this.coordinates = coords;
        this.map?.setCenter(coords);
        const marker = new google.maps.Marker({
          position: coords,
          map: this.map,
        });
        this.markers.push(marker);
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  ngOnInit(): void {
    this.geolocation.getCurrentLocation().then((position) => {
      this.options.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.startMap();
    }).catch((err) => {
      this.startMap();
    });
  };

  async submitData(data: NgForm) {
    this.loading = true;
    if (!data || !data.value) {
      this.error = 'O formulário é inválido ou vazio.';
      this.loading = false;
      return;
    }
    if (!data.value.description || !data.value.cpforcnpj || !data.value.address) {
      this.error = 'Preencha todos os campos para finalizar seu cadastro.';
      this.loading = false;
      return;
    }
    if (!this.address || this.address.trim() === '') {
      this.error = 'Endereço inválido ou vazio.';
      this.loading = false;
      return;
    }
    const post_data = {
      description: data.value.description,
      cpforcnpj: data.value.cpforcnpj,
      lat: this.coordinates!.lat,
      long: this.coordinates!.lng,
    }
    await this.api.createInstitution(post_data).then((success) => {
        this.loading = false;
        this.router.navigate(['/homeinstituicao']);
    }).catch((error) => {
      this.loading = false;
      console.log(error);
  });
  }
}
