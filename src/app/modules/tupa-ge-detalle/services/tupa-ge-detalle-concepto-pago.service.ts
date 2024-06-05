import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CptPago } from '../interfaces/tupa-ge-detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleConceptoPagoService {
  private listaPagos: BehaviorSubject<CptPago[]> = new BehaviorSubject([] as CptPago[]);
  public getLista: Observable<CptPago[]> = this.listaPagos.asObservable();

  private elementosBorrar: number[] = [];

  constructor() {}

  actualizarListaPagos(pago: CptPago[]) {
    this.listaPagos.next(pago);
  }

  obtenerLista(): CptPago[] {
    return this.listaPagos.getValue();
  }

  eliminarPagos() {
    const listaActual: CptPago[] = this.obtenerLista();
    let listaNueva: CptPago[] = [];

    this.elementosBorrar.forEach((index) => {
      listaNueva.push(listaActual[index]);
    });

    const listaNueva2 = listaActual.filter((actual) => !listaNueva.some((borrar) => borrar === actual));

    console.log(listaNueva2);

    this.elementosBorrar = [];
    this.listaPagos.next(listaNueva2);
  }

  agregarElemento(index: number) {
    this.elementosBorrar.push(index);
  }

  eliminarElemento(index: number) {
    this.elementosBorrar = this.elementosBorrar.filter((elem) => elem !== index);
  }
}
