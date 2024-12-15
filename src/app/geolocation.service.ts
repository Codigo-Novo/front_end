import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }

  getCoordinates(address: string): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          let errorMessage;
  
          switch (status) {
            case google.maps.GeocoderStatus.ZERO_RESULTS:
              errorMessage = 'Endereço não encontrado. Verifique os dados inseridos.';
              break;
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
              errorMessage = 'Limite de requisições excedido. Tente novamente mais tarde.';
              break;
            case google.maps.GeocoderStatus.REQUEST_DENIED:
              errorMessage = 'Requisição negada. Verifique as configurações da API.';
              break;
            case google.maps.GeocoderStatus.INVALID_REQUEST:
              errorMessage = 'Solicitação inválida. O endereço fornecido é incorreto.';
              break;
            default:
              errorMessage = `Erro de geocodificação: ${status}`;
          }
  
          reject(new Error(errorMessage));
        }
      });
    });
  }
}