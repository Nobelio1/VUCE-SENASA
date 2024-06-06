import { Injectable } from '@angular/core';
import { ListarServicioOut, ListaServicioIn, MontoIn, Servicio } from '../interfaces/tupa-ge-detalle.interface';
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
  public url2 = `${this.urlService}/conceptos`;

  constructor(private http: HttpClient) {}

  //?METODOS ------------------------------------------------------------

  actualizarServicio(servicio: Servicio[]) {
    this.listaServicios.next(servicio);
  }

  obtenerLista(): Servicio[] {
    return this.listaServicios.getValue();
  }

  //?PETICIONES HTTP ------------------------------------------------------------

  listarSerivicioModal(servicio: ListaServicioIn) {
    return this.http.post<ListarServicioOut>(`${this.url2}/listarServicios`, servicio);
  }

  calcularMonto(monto: MontoIn) {
    return this.http.post<any>(`${this.url2}/calcularMontoConcepto`, monto);
  }

  enviarMonto(codigo: string) {
    return this.http.get<any>(`${this.url2}/calcularMontoConcepto/${codigo}`);
  }
}
