import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitante, Solicitante2 } from '../../tupa-generica/interfaces/tupa-generica.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleOtroUsuarioService {
  private stateOtroUsario: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public getState: Observable<boolean> = this.stateOtroUsario.asObservable();

  private datosOtroSolicitante: BehaviorSubject<Solicitante2> = new BehaviorSubject({} as Solicitante2);
  public getDatos: Observable<Solicitante2> = this.datosOtroSolicitante.asObservable();

  constructor() {}

  actualizarEstado(state: boolean) {
    this.stateOtroUsario.next(state);
  }

  obtenerEstado(): boolean {
    return this.stateOtroUsario.getValue();
  }

  actualizarDatos(datosSo: Solicitante2) {
    this.datosOtroSolicitante.next(datosSo);
  }

  obtenerLista(): Solicitante2 {
    return this.datosOtroSolicitante.getValue();
  }
}
