import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListarArea, ListarBancos, ListarProAreaIn, ListarProAreaOut } from '../interfaces/tupa-ge-detalle.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGeDetalleService {
  private urlService = environment.API_MASTER;
  public url = `${this.urlService}/detalle`;
  public url2 = `${this.urlService}/conceptoPagos`;

  constructor(private http: HttpClient) {}

  listArea() {
    return this.http.get<ListarArea>(`${this.url}/listarArea`);
  }

  listProcedimientoPorAreas(request: ListarProAreaIn) {
    return this.http.post<ListarProAreaOut>(`${this.url}/procedimientoPorArea`, request);
  }

  listBancos() {
    return this.http.get<ListarBancos>(`${this.url2}/listarBanco`);
  }
}
