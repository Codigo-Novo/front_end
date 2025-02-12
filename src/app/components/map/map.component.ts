import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { OnInit } from '@angular/core';
import { Institution } from '../../institution.interface';
import { DataService } from '../../data.service';

@Component({
    selector: 'app-map',
    imports: [GoogleMapsModule],
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  institutions: Institution[] = [];

  constructor(private api: DataService) { }

  options: google.maps.MapOptions = {
    center: { lat: -24.043779373168945, lng: -52.38108825683594 },
    zoom: 15,
  };

  ngOnInit(): void {
    this.api.getInstitutions().subscribe((data: Institution[]) => {
      this.institutions = data;
      var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
      this.adicionarMarcadores(map);
    });
  }

  adicionarMarcadores(map: google.maps.Map) {
    this.institutions.forEach((instituicao) => {
      const lat = parseFloat(instituicao.lat as unknown as string);
      const lng = parseFloat(instituicao.long as unknown as string);
      var position = { lat: lat, lng: lng};
      const gMarker = new google.maps.Marker({
        position: position,
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
