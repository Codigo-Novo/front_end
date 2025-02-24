import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiRoot = 'https://127.0.0.1:8000/';

    constructor(private http: HttpClient) { } 

    createUser(data: { username: string, name: string, email: string; password: string }) : Promise<String> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        console.error('CSRF token não encontrado nos cookies.');
                        reject('Erro interno');
                        return;
                    }
                    const post_data = {
                        password: data.password || '',
                        email: data.email || '',
                        first_name: data.name || '',
                        username: data.username || '',
                    };
                    const url = this.apiRoot.concat('cadastro/usuario/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: async (response) => {
                            await this.login(data);
                            resolve('Sucesso ao criar conta!');
                        },
                        error: (error) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })

    
    }

    defineDonator(username: string) {
        this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
            next: (response) => {
                const csrfToken = response.body;
                const stringcsrfToken = JSON.stringify(csrfToken);
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

    defineInstitution(username: string) : Promise <boolean> {
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
                    const url = this.apiRoot.concat('cadastro/setUserInstitution/');
                    const post_data = {
                        username: username,
                    }
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }}).subscribe({
                        next: (response) => {
                            console.log('Resposta da API:', response);
                            resolve(true);
                        },
                        error: (error) => { 
                            console.error('Erro no POST:', error.error); 
                            resolve(false);
                        },
                    });
                },
            });
        })
    }

    createInstitution(data: { description: string, cpforcnpj: string, lat: number, long: number}) : Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        reject('Erro interno.');
                        return;
                    }
                    const post_data = {
                        description: data.description || '',
                        cpforcnpj: data.cpforcnpj || '',
                        lat: data.lat || '',
                        long: data.long || '',
                    };
                    const url = this.apiRoot.concat('cadastro/createInstitution/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response) => {
                            resolve('Sucesso ao finalizar cadastro da instituição.');
                        },
                        error: (error) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    login(data: { username: string, password: string }) : Promise<boolean> {
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

    logout(): Promise<void> {
        return new Promise((resolve, reject)=> {
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
                            resolve();
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
        })
    }

    updateAccount(data: { username: string, name: string, email: string, id: number}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        resolve("Erro interno.");
                        return;
                    }
                    const post_data = {
                        username: data.username || '',
                        first_name: data.name || '',
                        email: data.email || '',
                    };
                    const url = this.apiRoot.concat(`cadastro/usuario/${data.id}/`);
                    this.http.patch(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response?.success);
                        },
                        error: (error: any) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    updateInstitution(data: { description: string, cpforcnpj: string, lat: number, long: number, id: number}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        resolve("Erro interno.");
                        return;
                    }
                    const post_data = {
                        description: data.description || '',
                        cpforcnpj: data.cpforcnpj || '',
                        lat: data.lat || '',
                        long: data.long || '',
                    };
                    const url = this.apiRoot.concat(`cadastro/instituicao/${data.id}/`);
                    this.http.patch(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response?.success);
                        },
                        error: (error: any) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    verifyPassword(password: string): Promise<string> { 
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        resolve("Erro interno.");
                        return;
                    }
                    const post_data = {
                        password: password || '',
                    };
                    const url = this.apiRoot.concat(`cadastro/verifyPassword/`);
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response?.success);
                        },
                        error: (error: any) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    updatePassword(data: { username: string, password: string, id: number}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        resolve("Erro interno.");
                        return;
                    }
                    const post_data = {
                        password: data.password || '',
                    };
                    const url = this.apiRoot.concat(`cadastro/usuario/${data.id}/`);
                    this.http.patch(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: async (response: any) => {
                            const login = {
                                username: data.username || '',
                                password: data.password || '',
                            };
                            await this.login(login);
                            resolve(response?.success);
                        },
                        error: (error: any) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    deleteAccount(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        resolve("Erro interno.");
                        return;
                    }
                    const post_data = {
                        password: password || ''
                    };
                    const url = this.apiRoot.concat('cadastro/deleteUser/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response?.success);
                        },
                        error: (error: any) => {
                            reject(error.error?.error);
                        }
                    });
                }
            })
        })
    }

    checkAuth(): Observable<any>{
        return this.http.get(`${this.apiRoot}/cadastro/checkAuth/`, { withCredentials: true });
    }

    checkInstitution(): Observable<any>{
        return this.http.get(`${this.apiRoot}/cadastro/checkInstitution/`, { withCredentials: true });
    }

    addKeyWordInstitution(data: { institutionUsername: string, keywordId: number }): Promise<boolean> {
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
                        institutionUsername: data.institutionUsername || '',
                        keywordId: data.keywordId || ''
                    };
                    const url = this.apiRoot.concat('cadastro/addKeyWordInstitution/');
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

    removeKeyWordInstitution(data: { institutionUsername: string, keywordId: number }): Promise<boolean> {
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
                        institutionUsername: data.institutionUsername || '',
                        keywordId: data.keywordId || ''
                    };
                    const url = this.apiRoot.concat('cadastro/removeKeyWordInstitution/');
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

    createKeyWord(data: {keywordName: string }): Promise<boolean> {
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
                        name: data.keywordName || '',
                    };
                    const url = this.apiRoot.concat('cadastro/palavraschave/');
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
                }
            })
        })
    }
}