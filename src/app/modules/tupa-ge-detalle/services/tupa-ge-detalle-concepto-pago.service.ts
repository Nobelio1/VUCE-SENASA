import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CptPago } from '../interfaces/tupa-ge-detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleConceptoPagoService {
  private listaPagos: BehaviorSubject<CptPago[]> = new BehaviorSubject([] as CptPago[]);
  public getLista: Observable<CptPago[]> = this.listaPagos.asObservable();

  constructor() {}

  actualizarListaPagos(pago: CptPago[]) {
    this.listaPagos.next(pago);
  }

  obtenerLista(): CptPago[] {
    return this.listaPagos.getValue();
  }
}
