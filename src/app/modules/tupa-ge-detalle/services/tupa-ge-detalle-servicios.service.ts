import { Injectable } from '@angular/core';
import { Servicio } from '../interfaces/tupa-ge-detalle.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleServiciosService {
  private listaServicios: BehaviorSubject<Servicio[]> = new BehaviorSubject([] as Servicio[]);
  public getLista: Observable<Servicio[]> = this.listaServicios.asObservable();

  constructor() {}

  actualizarServicio(servicio: Servicio[]) {
    this.listaServicios.next(servicio);
  }

  obtenerLista(): Servicio[] {
    return this.listaServicios.getValue();
  }
}
