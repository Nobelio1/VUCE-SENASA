import { Injectable } from '@angular/core';
import { ListarServicioOut, ListaServicioIn, MontoIn, Servicio } from '../interfaces/tupa-ge-detalle.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface NombresServicio {
  area: string;
  proceso: string;
  serivico: string;
}

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleServiciosService {
  private listaServicios: BehaviorSubject<Servicio[]> = new BehaviorSubject([] as Servicio[]);
  public getLista: Observable<Servicio[]> = this.listaServicios.asObservable();

  private procedimiento: BehaviorSubject<string> = new BehaviorSubject('');
  public getProcedimiento: Observable<string> = this.procedimiento.asObservable();

  private idProcedimiento: string = '';

  public servicio: NombresServicio = {} as NombresServicio;

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

  actualizarProcedimiento(procedimiento: string) {
    this.procedimiento.next(procedimiento);
  }

  obtenerProcedimiento(): string {
    return this.procedimiento.getValue();
  }

  //TODO: TEMPORAL - COMPROBANDO PERSISTENCIA
  actualizarIdProcedimiento(id: string) {
    this.idProcedimiento = id;
  }

  obtenerIdProcedimiento(): string {
    return this.idProcedimiento;
  }

  obtenerServicio(): NombresServicio {
    return this.servicio;
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
