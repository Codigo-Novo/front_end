import { Component } from '@angular/core';
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { FooterComponent } from "../footer/footer.component";
import { WordCloudComponent } from "../word-cloud/word-cloud.component";
import { OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { GeolocationService } from '../../geolocation.service';
import { Router, NavigationEnd } from '@angular/router';
import { Institution } from '../../institution.interface';
import { GoogleMapsModule } from '@angular/google-maps';
import { KeyWord } from '../../keyword.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-startdoador',
  standalone: true,
  imports: [NavegacaoComponent, FooterComponent, WordCloudComponent, GoogleMapsModule, NgSelectModule, CommonModule, FormsModule],
  templateUrl: './homedoador.component.html',
  styleUrl: './homedoador.component.css'
})
export class HomedoadorComponent implements OnInit {

  institutions: Institution[] = [];
  filteredInstitutions: Institution[] = [];
  filter: string | null = null;
  keywords: KeyWord[] = [];
  selectedKeyword: KeyWord | null = null;

  markers: google.maps.Marker[] = [];
  map: google.maps.Map | null = null;
  options: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 15,
  };

  constructor(private api: ApiService, 
              private data: DataService, 
              private geolocation: GeolocationService,
              private router: Router) {
                this.router.events.pipe(
                  filter(event => event instanceof NavigationEnd)
                ).subscribe(() => {
                  window.scrollTo(0, 0);
                });
               }

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
            next: async (data: Institution[]) => {
              this.keywords = await this.getKeywords();
              this.startMap(data);
            },
            error: (error) => {
              console.error("Erro: ", error);
            },
          });}).catch((err) => {
            console.error("Erro: ", err);
            this.data.getInstitutions().subscribe({
              next: async (data: Institution[]) => {
                this.keywords = await this.getKeywords();
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

  getKeywords(): Promise<KeyWord[]> {
    return new Promise((resolve, reject) => {
      this.data.getKeyWords().subscribe(
        (data: KeyWord[]) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  onKeywordChange(selectedValue: KeyWord) {
    if (selectedValue) {
      this.selectedKeyword = selectedValue;
    } else {
      this.selectedKeyword = null;
    }
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

  compareKeywords(option: KeyWord, value: KeyWord): boolean {
    return option?.id === value?.id;
  }

  removerTodosMarcadores() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  filterInstitution(): Institution[] {
    if (this.selectedKeyword && this.filter) {
      return this.institutions.filter(item => {
        item.user.toLowerCase().includes(this.filter!.toLowerCase()) && 
        item.keywords.includes(this.selectedKeyword!.id)
      });
    } else if (this.filter) {
      return this.institutions.filter(item => item.user.toLowerCase().includes(this.filter!.toLowerCase()));
    } else if (this.selectedKeyword) {
      return this.institutions.filter(item => item.keywords.includes(this.selectedKeyword!.id));
    } else {
      return this.institutions;
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value == '') {
      this.removerTodosMarcadores();
      if (this.selectedKeyword) {
        this.filteredInstitutions = this.institutions.filter(item => item.keywords.includes(this.selectedKeyword!.id));
      } else {
        this.filteredInstitutions = this.institutions;
      }
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
        content: `
          <div>
            <h6>${instituicao.user}</h6>
            <a href="#" id="navigate-link" style="color: blue; text-decoration: underline;">
              Acessar página da instituição
            </a>
          </div>
        `,
      });
      gMarker.addListener('click', () => {
        infoWindow.open(map, gMarker);
      });
      infoWindow.addListener('domready', () => {
        const link = document.getElementById('navigate-link');
        link?.addEventListener('click', (e) => {
          e.preventDefault();
          this.router.navigate([`/paginainstituicao/${instituicao.id}`]);
        });
      });
      this.markers.push(gMarker);
    });
  }
}
