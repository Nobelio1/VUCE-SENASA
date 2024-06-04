import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ubigeo } from '../interfaces/tupa-generica.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGenericaDatosSoService {
  private urlServic2 = environment.API_MASTER2;

  public urlCOM = `${this.urlServic2}/senasa/tupaserver/api/ubigeos`;

  constructor(private http: HttpClient) {}

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
