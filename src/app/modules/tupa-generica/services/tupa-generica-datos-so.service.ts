import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Solicitante, Ubigeo } from '../interfaces/tupa-generica.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TupaGenericaDatosSoService {
  private datosSolicitante: BehaviorSubject<Solicitante> = new BehaviorSubject({} as Solicitante);
  public getDatos: Observable<Solicitante> = this.datosSolicitante.asObservable();

  private urlServic2 = environment.API_MASTER2;
  public urlCOM = `${this.urlServic2}/senasa/tupaserver/api/ubigeos`;

  constructor(private http: HttpClient) {}

  //?METODOS ------------------------------------------------------------

  actualizarDatos(datosSo: Solicitante) {
    this.datosSolicitante.next(datosSo);
  }

  obtenerLista(): Solicitante {
    return this.datosSolicitante.getValue();
  }

  //?PETICIONES HTTP ------------------------------------------------------------

  listaDep() {
    return this.http.get<Ubigeo[]>(`${this.urlCOM}`);
  }

  listaPro(dep: string) {
    return this.http.get<Ubigeo[]>(`${this.urlCOM}/${dep}/provincias`);
  }

  listaDis(dep: string, prov: string) {
    return this.http.get<Ubigeo[]>(`${this.urlCOM}/${dep}/provincias/${prov}/distritos`);
  }
}
