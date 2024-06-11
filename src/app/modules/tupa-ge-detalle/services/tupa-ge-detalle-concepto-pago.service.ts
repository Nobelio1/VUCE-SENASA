import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CptPago, ValidarExpedienteOut } from '../interfaces/tupa-ge-detalle.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleConceptoPagoService {
  private listaPagos: BehaviorSubject<CptPago[]> = new BehaviorSubject([] as CptPago[]);
  public getLista: Observable<CptPago[]> = this.listaPagos.asObservable();

  private elementosBorrar: number[] = [];
  private montoValido: boolean = true;

  private urlService = environment.API_MASTER;
  public url2 = `${this.urlService}/conceptos`;

  constructor(private http: HttpClient) {}

  //?METODOS ------------------------------------------------------------

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

  actualizarMontoValido(monto: boolean) {
    this.montoValido = monto;
  }

  obtenerMontoValido(): boolean {
    return this.montoValido;
  }

  //?PETICIONES HTTP ------------------------------------------------------------

  enviarCodigoExpediente(codigo: string) {
    return this.http.get<ValidarExpedienteOut>(`${this.url2}/validarExpediente/${codigo}`);
  }
}
