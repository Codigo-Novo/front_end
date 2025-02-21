import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavinstituicaoComponent } from "../navinstituicao/navinstituicao.component";
import { Location } from '@angular/common';
import { GeolocationService } from '../../geolocation.service';
import { ApiService } from '../../api.service';
import { DataService } from '../../data.service';
import { Institution } from '../../institution.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-editaccount',
    imports: [FooterComponent, NavinstituicaoComponent, FormsModule, NgIf],
    standalone: true,
    templateUrl: './editaccount.component.html',
    styleUrl: './editaccount.component.css'
})
export class EditaccountComponent implements OnInit {

    success: string = '';
    error: string = '';
    address: string = '';
  
    loading: boolean = false;

    institution: Institution | null = null;
  
    coordinates: { lat: number, lng: number } | null = null;
    map: google.maps.Map | null = null;
    markers: google.maps.Marker[] = [];
    options: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 16,
    };

    constructor (private location: Location, 
                 private geolocation: GeolocationService,
                 private api: ApiService,
                 private data: DataService,
                 private router: Router) { }

    async ngOnInit(): Promise<void> {
        try {
            const next = await this.api.checkInstitution().toPromise();
            this.data.getInstitutionByUser().subscribe({
                next: async (data: Institution) => {
                    this.institution = data;
                    const lat = parseFloat(this.institution.lat as unknown as string);
                    const lng = parseFloat(this.institution.long as unknown as string);
                    var position = { lat: lat, lng: lng };
                    this.options = {
                      center: position,
                      zoom: 15,
                    };
                    this.startMap();
                    var map = new google.maps.Map(document.getElementById('map-canvas')!, this.options);
                    this.map = map;
                    const gMarker = new google.maps.Marker({
                      position: position,
                      map: map,
                      title: this.institution.user,
                    });
                }
            })
        } catch (error) {
            this.router.navigate(['/']);
        }
    };
                 
    goBack() {
        this.location.back();
    }

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

    submit(data: NgForm) {
        if (!data || !data.value) {
            this.success = '';
            this.error= "O formulário é vazio ou inválido.";
            return;
        }
        if (!data.value.description || !data.value.cpforcnpj) {
            this.success = '';
            this.error = 'Por favor, preencha todos os campos obrigatórios para atualizar seus dados.';
            return;
        }
        if (data.value.address) {
            const post_data = {
                description: data.value.description || '',
                cpforcnpj: data.value.cpforcnpj || '',
                lat: this.coordinates!.lat,
                long: this.coordinates!.lng,
                id: this.institution!.id,
            };
            this.api.updateInstitution(post_data).then((success) => {
                this.success = 'Dados atualizados com sucesso!';
                this.error = '';
            }).catch((error) => {
                this.success = '';
                this.error = error;
            })
        } else {
            const post_data = {
                description: data.value.description || '',
                cpforcnpj: data.value.cpforcnpj || '',
                lat: this.institution!.lat,
                long: this.institution!.long,
                id: this.institution!.id,
            };
            this.api.updateInstitution(post_data).then((success) => {
                this.success = 'Dados atualizados com sucesso!';
                this.error = '';
            }).catch((error) => {
                this.success = '';
                this.error = error;
            })
        }
    }
}
