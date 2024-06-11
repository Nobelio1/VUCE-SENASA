import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoExpendiente } from '../interfaces/guadar-solicitud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoExpedienteService {
  private url = `${environment.API_MASTER}/generarpdf`;

  private infoExpediente: BehaviorSubject<InfoExpendiente> = new BehaviorSubject({} as InfoExpendiente);
  public getInfo: Observable<InfoExpendiente> = this.infoExpediente.asObservable();

  public guardadoCompleto: boolean = true;

  constructor(private http: HttpClient) {}

  //?METODOS ------------------------------------------------------------

  actualizarDatos(info: InfoExpendiente) {
    this.infoExpediente.next(info);
  }

  obtenerLista(): InfoExpendiente {
    return this.infoExpediente.getValue();
  }

  obtenerGuardadoCompleto(): boolean {
    return this.guardadoCompleto;
  }

  //?PETICIONES HTTP ------------------------------------------------------------

  descargarRecibo(recibo: string): Observable<Blob> {
    return this.http.get(`${this.url}/reciboPago/${recibo}`, { responseType: 'blob' });
  }
}
