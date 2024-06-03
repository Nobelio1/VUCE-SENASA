import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleOtroUsuarioService {
  private stateOtroUsario: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public getState: Observable<boolean> = this.stateOtroUsario.asObservable();

  constructor() {}

  actualizarEstado(state: boolean) {
    this.stateOtroUsario.next(state);
  }

  obtenerEstado(): boolean {
    return this.stateOtroUsario.getValue();
  }
}
