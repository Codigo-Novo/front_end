import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiRoot = 'https://127.0.0.1:8000/';

    constructor(private http: HttpClient) { } 

    createUser(data: { username: string; email: string; password: string }) : Promise<Boolean> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        console.error('CSRF token não encontrado nos cookies.');
                        resolve(false);
                        return;
                    }
                    const post_data = {
                        password: data.password || '',
                        email: data.email || '',
                        username: data.username || ''
                    };
                    const url = this.apiRoot.concat('cadastro/usuario/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response) => {
                            console.log('Resposta da API:', response);
                            this.login(data);
                            resolve(true);
                        },
                        error: (error) => {
                            console.error('Erro no POST:', error.error)
                            resolve(false);
                        }
                    });
                }
            })
        })
    }

    defineDonator(username: string) {
        this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
            next: (response) => {
                const csrfTokens = response.body;
                const stringcsrfToken = JSON.stringify(csrfTokens);
                const parsedData = JSON.parse(stringcsrfToken);
                if (!parsedData.csrfToken) {
                    console.error('CSRF token não encontrado nos cookies.');
                    return;
                }
                const url = this.apiRoot.concat('cadastro/setUserDonator/');
                const post_data = {
                    username: username,
                }
                this.http.post(url, post_data, {
                    withCredentials: true,
                    headers: { 'X-CSRFToken': parsedData.csrfToken }}).subscribe({
                    next: (response) => {
                        console.log('Resposta da API:', response);
                    },
                    error: (error) => console.error('Erro no POST:', error.error)
                });
            },
            error: (error) => {
                console.error('Erro ao obter CSRF token:', error.error);
            },
        });
    }

    defineInstitution(username: string) {
        this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
            next: (response) => {
                const csrfTokens = response.body;
                const stringcsrfToken = JSON.stringify(csrfTokens);
                const parsedData = JSON.parse(stringcsrfToken);
                if (!parsedData.csrfToken) {
                    console.error('CSRF token não encontrado nos cookies.');
                    return;
                }
                const url = this.apiRoot.concat('cadastro/setUserInstitution/');
                const post_data = {
                    username: username,
                }
                this.http.post(url, post_data, {
                    withCredentials: true,
                    headers: { 'X-CSRFToken': parsedData.csrfToken }}).subscribe({
                    next: (response) => {
                        console.log('Resposta da API:', response);
                    },
                    error: (error) => console.error('Erro no POST:', error.error)
                });
            },
            error: (error) => {
                console.error('Erro ao obter CSRF token:', error.error);
            },
        });
    }

    login(data: { username: string; password: string }) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        console.error('CSRF token não encontrado nos cookies.');
                        resolve(false);
                        return;
                    }
                    const post_data = {
                        password: data.password || '',
                        username: data.username || ''
                    };
                    const url = this.apiRoot.concat('cadastro/loginView/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response) => {
                            console.log('Resposta da API:', response);
                            resolve(true);
                        },
                        error: (error) => {
                            console.error('Erro no POST:', error.error)
                            resolve(false);
                        }
                    });
                },
                error: (error) => {
                    console.error('Erro ao obter CSRF token:', error.error);
                    resolve(false);
                }
            });
        });
    }    

    logout() {
        this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
            next: (response) => {
                const csrfTokens = response.body;
                const stringcsrfToken = JSON.stringify(csrfTokens);
                const parsedData = JSON.parse(stringcsrfToken);
                const payload = {};
                return this.http.post(this.apiRoot.concat('/cadastro/logoutView/'), payload, { 
                    withCredentials: true,
                    headers: { 'X-CSRFToken': parsedData.csrfToken } 
                }).subscribe({
                    next: (response) => {
                        console.log("Usuário deslogado com sucesso.");
                    },
                    error: (error) => {
                        console.error("Erro ao fazer logout.");
                    }
                });
            },
            error: (error) => {
                console.error("Erro ao obter csrfToken.");
            }
        });
    }

    checkAuth(): Observable<any>{
        return this.http.get(`${this.apiRoot}/cadastro/checkAuth/`, { withCredentials: true });
    }
}