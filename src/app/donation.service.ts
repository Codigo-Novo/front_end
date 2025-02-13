import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from './donation.interface';

@Injectable({
    providedIn: 'root'
})
export class DonationService {
    private apiRoot = 'https://127.0.0.1:8000/';

    constructor(private http: HttpClient) { }

    generateToken(data: {description: string, institution: number}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        console.error('CSRF token não encontrado nos cookies.');
                        resolve("");
                        return;
                    }
                    const post_data = {
                        institution: data.institution || '',
                        description: data.description || '',
                    };
                    const url = this.apiRoot.concat('donation/generateToken/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            console.log('Resposta da API:', response);
                            const token = response?.Token;
                            resolve(token || "");
                        },
                        error: (error) => {
                            console.error('Erro no POST:', error.error)
                            resolve("");
                        }
                    });
                }
            })
        })
    }

    generateDonation(data: {description: string, institution: number, donator: string}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        console.error('CSRF token não encontrado nos cookies.');
                        resolve("");
                        return;
                    }
                    const post_data = {
                        institution: data.institution || '',
                        description: data.description || '',
                        donator: data.donator || '',
                    };
                    const url = this.apiRoot.concat('donation/generateDonation/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            console.log('Resposta da API:', response);
                            const token = response?.Token;
                            resolve(token || "");
                        },
                        error: (error) => {
                            console.error('Erro no POST:', error.error)
                            reject(error.error?.message);
                        }
                    });
                }
            })
        })
    }
}