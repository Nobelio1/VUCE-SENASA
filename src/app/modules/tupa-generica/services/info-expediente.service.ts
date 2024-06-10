import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoExpendiente } from '../interfaces/guadar-solicitud.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoExpedienteService {
  private infoExpediente: BehaviorSubject<InfoExpendiente> = new BehaviorSubject({} as InfoExpendiente);
  public getInfo: Observable<InfoExpendiente> = this.infoExpediente.asObservable();

  public guardadoCompleto: boolean = true;

  constructor() {}

  //?METODOS ------------------------------------------------------------

  actualizarDatos(info: InfoExpendiente) {
    this.infoExpediente.next(info);
  }

  obtenerLista(): InfoExpendiente {
    return this.infoExpediente.getValue();
  }

  obtenerGuardadoCompleto(): boolean {
    return this.guardadoCompleto;
  }
}
