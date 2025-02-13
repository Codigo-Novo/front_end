import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Institution } from './institution.interface';
import { KeyWord } from './keyword.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiRoot = 'https://127.0.0.1:8000/';

    constructor(private http: HttpClient) { } 

    getInstitutions(): Observable<Institution[]>{
        return this.http.get<Institution[]>(this.apiRoot.concat('cadastro/instituicao/'));
    }

    getInstitution(id: number): Observable<Institution> {
        return this.http.get<Institution>(this.apiRoot.concat(`cadastro/instituicao/${id}`));
    }

    getKeyWords(): Observable<KeyWord[]>{
        return this.http.get<KeyWord[]>(this.apiRoot.concat('cadastro/palavraschave/'));
    }

    getKeyWord(id: number): Observable<KeyWord>{
        return this.http.get<KeyWord>(this.apiRoot.concat(`cadastro/palavraschave/${id}`));
    }

    getTrendKeyWords(n: number): Observable<{ id: number; name: string; count: number }[]> {
        return this.http.get<{ csrfToken: string }>(this.apiRoot.concat('csrf/'), { withCredentials: true }).pipe(
            switchMap(csrfResponse => {
                const csrfToken = csrfResponse.csrfToken;
                if (!csrfToken) {
                    throw new Error('CSRF token não encontrado nos cookies.');
                }
                return this.http.get<{ keywords: any[] }>(`${this.apiRoot}cadastro/getTrendKeyWords/${n}`, { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } });
            }),
            map(response => 
                response.keywords.map(item => ({
                    id: item.keyword.id,
                    name: item.keyword.name,
                    count: item.count,
                }))
            ),
            catchError(err => {
                console.error('Erro ao buscar as palavras-chave:', err);
                return of([]);
            })
        );
    }
}