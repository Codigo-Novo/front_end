import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from './institution.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiRoot = 'https://127.0.0.1:8000/';

    constructor(private http: HttpClient) { } 

    getInstitutions(): Observable<Institution[]>{
        return this.http.get<Institution[]>(this.apiRoot.concat('cadastro/instituicao/'));
    }
}