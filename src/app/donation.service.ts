import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation, DonationsResponse } from './donation.interface';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

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
                        resolve("Erro interno.");
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
                            const token = response?.Token;
                            resolve(token || "");
                        },
                        error: (error) => {
                            resolve("Erro interno.");
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
                        resolve("Erro interno.");
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
                            const token = response?.Token;
                            resolve(token || "");
                        },
                        error: (error) => {
                            reject(error.error?.message);
                        }
                    });
                }
            })
        })
    }

    getInstitutionDonations(): Observable<DonationsResponse> {
        return this.http.get<{ csrfToken: string }>(this.apiRoot.concat('csrf/'), { withCredentials: true }).pipe(
            switchMap(response => {
                if (!response.csrfToken) {
                    throw new Error("CSRF token not found");
                }
                return this.http.get<DonationsResponse>(this.apiRoot.concat('donation/getInstitutionDonations/'), { withCredentials: true });
            }),
            catchError(error => {
                console.error("Error fetching donations:", error);
                return throwError(() => error);
            })
        );
    }
}