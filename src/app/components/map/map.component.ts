import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, HeaderComponent, FooterComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  options: google.maps.MapOptions = {
    center: { lat: -24.043779373168945, lng: -52.38108825683594 },
    zoom: 15,
  };
  
  marcadores: { position: google.maps.LatLngLiteral; title: string }[] = [
    { position: { lat: -24.043779, lng: -52.381088 }, title: 'Marcador 1' },
    { position: { lat: -24.045, lng: -52.382 }, title: 'Marcador 2' },
  ];

  ngOnInit() {
    var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
    this.adicionarMarcadores(map);
  }

  adicionarMarcadores(map: google.maps.Map) {
    this.marcadores.forEach((marcador) => {
      console.log("Adicionando marcador:", marcador);
      const gMarker = new google.maps.Marker({
        position: marcador.position,
        map: map,
        title: marcador.title,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: marcador.title,
      });
      gMarker.addListener('click', () => {
        infoWindow.open(map, gMarker);
      });
    });
  }
}
