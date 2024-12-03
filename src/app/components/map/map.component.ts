import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, HeaderComponent, FooterComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  options: google.maps.MapOptions = {
    mapId: "dba8017d56ad3011",
    center: { lat: -24.043779373168945, lng: -52.38108825683594 },
    zoom: 15,
  };
}
