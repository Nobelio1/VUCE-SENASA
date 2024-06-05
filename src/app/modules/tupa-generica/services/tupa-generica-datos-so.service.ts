import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Solicitante, Solicitante2, Ubigeo } from '../interfaces/tupa-generica.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TupaGenericaDatosSoService {
  private datosSolicitante: BehaviorSubject<Solicitante2> = new BehaviorSubject({} as Solicitante2);
  public getDatos: Observable<Solicitante2> = this.datosSolicitante.asObservable();

  private urlServic2 = environment.API_MASTER2;
  public urlCOM = `${this.urlServic2}/senasa/tupaserver/api/ubigeos`;

  constructor(private http: HttpClient) {}

  //?METODOS ------------------------------------------------------------

  actualizarDatos(datosSo: Solicitante2) {
    this.datosSolicitante.next(datosSo);
  }

  obtenerLista(): Solicitante2 {
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
