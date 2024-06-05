import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitante } from '../../tupa-generica/interfaces/tupa-generica.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleOtroUsuarioService {
  private stateOtroUsario: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public getState: Observable<boolean> = this.stateOtroUsario.asObservable();

  private datosOtroSolicitante: BehaviorSubject<Solicitante> = new BehaviorSubject({} as Solicitante);
  public getDatos: Observable<Solicitante> = this.datosOtroSolicitante.asObservable();

  constructor() {}

  actualizarEstado(state: boolean) {
    this.stateOtroUsario.next(state);
  }

  obtenerEstado(): boolean {
    return this.stateOtroUsario.getValue();
  }

  actualizarDatos(datosSo: Solicitante) {
    this.datosOtroSolicitante.next(datosSo);
  }

  obtenerLista(): Solicitante {
    return this.datosOtroSolicitante.getValue();
  }
}
