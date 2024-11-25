import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiRoot = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) { } 

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiRoot.concat('cadastro/usuario/'));
    }

    createUser(data: { username: string; email: string; password: string }) {
        const post_data = {
            password: data.password || '',
            email: data.email || '',
            username: data.username || ''
        };
    
        const url = this.apiRoot.concat('cadastro/usuario/');
        console.log('URL para API:', url);
        console.log('Dados sendo enviados:', post_data);
    
        return this.http.post(url, post_data).subscribe({
            next: (response) => console.log('Resposta da API:', response),
            error: (error) => console.error('Erro no POST:', error)
        });
    }
}