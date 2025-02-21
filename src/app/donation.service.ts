import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DonationsResponse } from './donation.interface';
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
                        reject("Erro interno.");
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
                            reject("Erro interno.");
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

    redeemToken(token: string): Promise<string> {
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
                        token: token || ''
                    };
                    const url = this.apiRoot.concat('donation/redeemToken/');
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

    getDonatorDonations(): Observable<DonationsResponse> {
        return this.http.get<{ csrfToken: string }>(this.apiRoot.concat('csrf/'), { withCredentials: true }).pipe(
            switchMap(response => {
                if (!response.csrfToken) {
                    throw new Error("CSRF token not found");
                }
                return this.http.get<DonationsResponse>(this.apiRoot.concat('donation/getDonatorDonations/'), { withCredentials: true });
            }),
            catchError(error => {
                console.error("Error fetching donations:", error);
                return throwError(() => error);
            })
        );
    }

    editDonation(data: {description: string, id: number}): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        reject("Erro interno.");
                        return;
                    }
                    const post_data = {
                        id: data.id || '',
                        description: data.description || '',
                    };
                    const url = this.apiRoot.concat('donation/editDonation/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response.success);
                        },
                        error: (error) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }

    deleteDonation(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiRoot.concat('csrf/'), { withCredentials: true, observe: "response" }).subscribe({
                next: (response) => {
                    const csrfTokens = response.body;
                    const stringcsrfToken = JSON.stringify(csrfTokens);
                    const parsedData = JSON.parse(stringcsrfToken);
                    if (!parsedData.csrfToken) {
                        reject("Erro interno.");
                        return;
                    }
                    const post_data = {
                        id: id || '',
                    };
                    const url = this.apiRoot.concat('donation/deleteDonation/');
                    this.http.post(url, post_data, {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': parsedData.csrfToken }
                    }).subscribe({
                        next: (response: any) => {
                            resolve(response.success);
                        },
                        error: (error) => {
                            reject(error.error);
                        }
                    });
                }
            })
        })
    }
}