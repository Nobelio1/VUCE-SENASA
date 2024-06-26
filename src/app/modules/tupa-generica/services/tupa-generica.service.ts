import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AgregarUsuarioIn,
  AgregarUsuarioOut,
  ListarTipoDocumentos,
  RegistroUsuario,
  RepresentateOut,
  SolicitanteIn,
  SolicitanteOut,
} from '../interfaces/tupa-generica.interface';

@Injectable({
  providedIn: 'root',
})
export class TupaGenericaService {
  private urlService = environment.API_MASTER;
  private urlServic2 = environment.API_MASTER2;

  public urlAPI = `${this.urlService}/datosSolicitante`;
  public urlCOM = `${this.urlServic2}/senasa/tupaserver/api/people`;
  public urlCOM2 = `${this.urlServic2}/senasa/tupaserver/api/reniec`;

  constructor(private http: HttpClient) {}

  listTipoDocumento() {
    return this.http.get<ListarTipoDocumentos>(`${this.urlAPI}/listarTipoDocumento`);
  }

  listarSoliciante(solicitante: SolicitanteIn) {
    return this.http.post<SolicitanteOut>(`${this.urlService}/infoSolicitante/obtenerPersonaPorDocumento`, solicitante);
  }

  getRegistroReniec(dni: string) {
    return this.http.get<RegistroUsuario>(`${this.urlCOM2}/searchByDni/${dni}`);
  }

  getRegistrosSunat(ruc: string) {
    return this.http.get<RegistroUsuario>(`${this.urlCOM2}/searchByRuc/${ruc}`);
  }

  getRepresentanteLegal(id: string) {
    return this.http.get<RepresentateOut>(`${this.urlAPI}/datos/${id}`);
  }

  agregarUsuario(usuario: AgregarUsuarioIn) {
    return this.http.post<AgregarUsuarioOut>(`${this.urlService}/grabar/agregarPersona`, usuario);
  }
}
