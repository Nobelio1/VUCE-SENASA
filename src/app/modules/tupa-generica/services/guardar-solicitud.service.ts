import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ActualizarReciboIn,
  ActualizarReciboOut,
  GrabarInactivoIn,
  GrabarInactivoOut,
  GuardarSolicitudIn,
  GuardarSolicitudOut,
} from '../interfaces/guadar-solicitud.interface';

@Injectable({
  providedIn: 'root',
})
export class GuardarSolicitudService {
  private url = `${environment.API_MASTER}/grabar`;

  constructor(private http: HttpClient) {}

  grabarSolicitud(solicitud: GuardarSolicitudIn) {
    return this.http.post<GuardarSolicitudOut>(`${this.url}/solicitud`, solicitud);
  }

  grabarInactivo(solicitud: GrabarInactivoIn) {
    return this.http.post<GrabarInactivoOut>(`${this.url}/inactivo`, solicitud);
  }

  actualizarRecibo(solicitud: ActualizarReciboIn) {
    return this.http.post<ActualizarReciboOut>(`${this.url}/actualizarRecibo`, solicitud);
  }
}
