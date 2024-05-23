import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListarTipoDocumentos } from '../interfaces/tupa-generica.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGenericaService {
  private urlService = environment.API_MASTER;

  public url = `${this.urlService}/datosSolicitante`;
  constructor(private http: HttpClient) {}

  listTipoDocumento() {
    return this.http.get<ListarTipoDocumentos>(`${this.url}/listarTipoDocumento`);
  }
}
