import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Institution } from '../../institution.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, HeaderComponent, FooterComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  institutions: Institution[] = [];

  constructor(private api: ApiService) { }

  options: google.maps.MapOptions = {
    center: { lat: -24.043779373168945, lng: -52.38108825683594 },
    zoom: 15,
  };

  ngOnInit(): void {
    this.api.getInstitutions().subscribe((data: Institution[]) => {
      this.institutions = data;
    });
    console.log("Teste:", this.institutions);
    var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
    this.adicionarMarcadores(map);
  }

  adicionarMarcadores(map: google.maps.Map) {
    this.institutions.forEach((instituicao) => {
      console.log("Adicionando marcador:", instituicao);
      const gMarker = new google.maps.Marker({
        position: { lat: instituicao.lat, lng: instituicao.long},
        map: map,
        title: instituicao.description,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: instituicao.description,
      });
      gMarker.addListener('click', () => {
        infoWindow.open(map, gMarker);
      });
    });
  }
}
