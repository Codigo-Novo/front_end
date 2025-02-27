import { Component, OnInit } from '@angular/core';
import { NavegacaoComponent } from '../navegacao/navegacao.component';
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Institution } from '../../institution.interface';
import { KeyWord } from '../../keyword.interface';
import { CommonModule, Location } from '@angular/common';

@Component({
    selector: 'app-paginainstituicao',
    imports: [NavegacaoComponent, FooterComponent, CommonModule],
    standalone: true,
    templateUrl: './paginainstituicao.component.html',
    styleUrl: './paginainstituicao.component.css'
})
export class PaginainstituicaoComponent implements OnInit {

  userId: string | null = null;
  institution: Institution | null = null;
  keywords: KeyWord[] = [];
  map: google.maps.Map | null = null;
  options: google.maps.MapOptions | null = null;

  found: boolean = true;

  constructor(private route: ActivatedRoute, 
              private data: DataService,
              private location: Location,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.institution = await this.getInstitution(<number><unknown>this.userId);
      if (!this.institution.is_active) {
        this.found = false;
        return;
      }
      this.institution.keywords.forEach(async (keyword) => {
        this.keywords.push(await this.getKeyword(keyword))
      })
      const lat = parseFloat(this.institution.lat as unknown as string);
      const lng = parseFloat(this.institution.long as unknown as string);
      var position = { lat: lat, lng: lng };
      const options: google.maps.MapOptions = {
        center: position,
        zoom: 15,
      };
      var map = new google.maps.Map(document.getElementById('map-canvas')!, options);
      this.options = options;
      this.map = map;
      const gMarker = new google.maps.Marker({
        position: position,
        map: map,
        title: this.institution.user,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h6>${this.institution.user}</h6>
            <p>${this.institution.description}</p>
          </div>
        `,
      });
      gMarker.addListener('click', () => {
        infoWindow.open(map, gMarker);
      });
    } catch (error) {
      this.found = false;
    }
  }

  getInstitution(id: number): Promise<Institution> {
    return new Promise((resolve, reject) => {
      this.data.getInstitution(id).subscribe(
        (data: Institution) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  getKeyword(id: number): Promise<KeyWord> {
    return new Promise((resolve, reject) => {
      this.data.getKeyWord(id).subscribe(
        (data: KeyWord) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  goBack() {
    this.location.back();
  }
}
