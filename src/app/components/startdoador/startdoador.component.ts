import { Component } from '@angular/core';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";
import { OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { GeolocationService } from '../../geolocation.service';
import { Router } from '@angular/router';
import { Institution } from '../../institution.interface';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-startdoador',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, GoogleMapsModule],
  templateUrl: './startdoador.component.html',
  styleUrl: './startdoador.component.css'
})
export class StartdoadorComponent implements OnInit {

  institutions: Institution[] = [];
  filteredInstitutions: Institution[] = [];
  filter: string | null = null;
  markers: google.maps.Marker[] = [];
  map: google.maps.Map | null = null;
  options: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 15,
  };

  constructor(private api: ApiService, 
              private data: DataService, 
              private geolocation: GeolocationService,
              private router: Router) { }

  startMap(data: Institution[]) {
    this.institutions = data;
    this.filteredInstitutions = data;
    var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
    this.map = map;
    this.adicionarMarcadores(map);
  }

  ngOnInit() {
    this.api.checkAuth().subscribe({
      next: (value) => {
        this.geolocation.getCurrentLocation().then((position) => {
          this.options.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.data.getInstitutions().subscribe({
            next: (data: Institution[]) => {
              this.startMap(data);
            },
            error: (error) => {
              console.error("Erro: ", error);
            },
          });}).catch((err) => {
            console.error("Erro: ", err);
            this.data.getInstitutions().subscribe({
              next: (data: Institution[]) => {
                this.startMap(data);
              },
              error: (error) => {
                console.error("Erro: ", error);
              },
            });
        });
      },
      error: (error) => {
        this.router.navigate(['/login']);
        console.error("Erro: ", error);
      },
    })
  }

  removerTodosMarcadores() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  filterInstitution(): Institution[] {
    return this.institutions.filter(item =>
      item.user.toLowerCase().includes(this.filter!.toLowerCase())
    );
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value == '') {
      this.removerTodosMarcadores();
      this.filteredInstitutions = this.institutions;
      this.adicionarMarcadores(this.map!);
      this.map?.setCenter(this.options.center!);
      return;
    }
    this.filter = target.value;
    this.removerTodosMarcadores();
    this.filteredInstitutions = this.filterInstitution();
    if (this.filteredInstitutions.length > 0) {
      this.map?.setCenter({
        lat: parseFloat(this.filteredInstitutions[0].lat as unknown as string),
        lng: parseFloat(this.filteredInstitutions[0].long as unknown as string),
      });
    } else {
      this.map?.setCenter(this.options.center!);
    }
    this.adicionarMarcadores(this.map!);
  }

  adicionarMarcadores(map: google.maps.Map) {
    this.filteredInstitutions.forEach((instituicao) => {
      const lat = parseFloat(instituicao.lat as unknown as string);
      const lng = parseFloat(instituicao.long as unknown as string);
      var position = { lat: lat, lng: lng};
      const gMarker = new google.maps.Marker({
        position: position,
        map: map,
        title: instituicao.user,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: instituicao.user,
      });
      gMarker.addListener('click', () => {
        infoWindow.open(map, gMarker);
      });
      this.markers.push(gMarker);
    });
  }
}
