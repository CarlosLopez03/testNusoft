import { Injectable } from '@angular/core';
import { MessageToastrService } from '../toasts.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public useLocation?: string;

  //TODO: Conocer si el usuario ya tiene la localización
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(private messageToastrService: MessageToastrService) {
    this.getUserLocation();
  }

  //TODO: Promesa para obtener la localización concatenada tal cual dice en la prueba: latitud, longitu
  async getUserLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = `${coords.latitude.toString()},${coords.longitude.toString()}`;
          resolve(this.useLocation);
        },
        (err) => {
          this.messageToastrService.error(`Error: ${err.message}`);
          reject();
        }
      );
    });
  }
}
