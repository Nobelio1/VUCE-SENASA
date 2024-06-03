import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UbigeoServiceService {
  private urlServic2 = environment.API_MASTER2;
  public urlCOM = `${this.urlServic2}/senasa/tupaserver/api/ubigeos`;

  constructor(private http: HttpClient) {}

  listarPaises() {}
}
