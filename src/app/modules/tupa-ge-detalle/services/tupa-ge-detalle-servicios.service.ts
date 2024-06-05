import { Injectable } from '@angular/core';
import { MontoIn, Servicio } from '../interfaces/tupa-ge-detalle.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleServiciosService {
  private listaServicios: BehaviorSubject<Servicio[]> = new BehaviorSubject([] as Servicio[]);
  public getLista: Observable<Servicio[]> = this.listaServicios.asObservable();

  private urlService = environment.API_MASTER;
  public url2 = `${this.urlService}/conceptoPago`;

  constructor(private http: HttpClient) {}

  actualizarServicio(servicio: Servicio[]) {
    this.listaServicios.next(servicio);
  }

  obtenerLista(): Servicio[] {
    return this.listaServicios.getValue();
  }

  calcularMonto(monto: MontoIn) {
    return this.http.post<any>(`${this.url2}/calcularMontoConcepto`, monto);
  }
}
