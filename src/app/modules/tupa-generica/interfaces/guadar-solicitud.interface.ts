import { Result } from 'src/app/shared/interfaces/shared.interface';

export interface GuardarSolicitudIn {
  pcentrotramite: string;
  pcanal: string;
  ppersonaid: string;
  pprocedimientotupa: string;
  puserid: string;
  prepresentanteid: string;
  pcodexpediente: string;
  pcodsolicitud: string;
  pcodigostddoc: string;
  pcodorden: string;
}

export interface GuardarSolicitud {
  pcodsolicitud: string;
  pcodigostddoc: string;
}

export interface GuardarSolicitudOut extends Result {
  data: GuardarSolicitud[];
}

export interface GrabarInactivoIn {
  pcentrotramite: string;
  pcanal: string;
  ppersonaid: string;
  ppersonaidotro: string;
  pprocedimientotupa: string;
  puserid: string;
  pcodexpediente: string;
  ppersonaidsolicitante: string;
  prepresentanteid: string;
  pdetallerecibo: string;
  pdetallevacuna: string;
  ppagorecibo: string;
  pcodorden: string;
}

export interface GrabarInactivo {
  pcodsolicitud: string;
  pcodexpediente: string;
  pcodrecibo: string;
  pcodigostddoc: string;
}

export interface GrabarInactivoOut extends Result {
  data: GrabarInactivo[];
}

export interface ActualizarReciboIn {
  pcodrecibo: string;
  pucmid: string;
  pcodigostddoc: string;
  puserid: string;
  pcodexpediente: string;
}

export interface ActualizarRecibo {
  pcodrecibo: string;
}

export interface ActualizarReciboOut extends Result {
  data: ActualizarRecibo[];
}

export interface InfoExpendiente {
  nroExpediente: string;
  fechaRegistro: string;
  oficina: string;
  area: string;
  proceso: string;
  servicioTupa: string;
  usuario: string;
  codRecibo: string;
}
