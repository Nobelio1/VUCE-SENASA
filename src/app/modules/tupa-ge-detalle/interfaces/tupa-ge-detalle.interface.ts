import { Result } from 'src/app/shared/interfaces/shared.interface';

export enum TupaGeDetalleIdEnum {
  SERVICIOS = 'SERVICIOS',
  TIPO_ADICIONAL = 'TIPO_ADICIONAL',
  OTRO_USUARIO = 'OTRO_USUARIO',
  CPT_PAGO = 'CPT_PAGO',
}

export interface TupaGeDetalleInterface {
  id: TupaGeDetalleIdEnum;
  name: string;
  active: boolean;
}

export interface Servicio {
  id: number;
  concepto: string;
  cantidad: number;
  costo: number;
}

export interface CptPago {
  id: number;
  tipoPago: string;
  banco: string;
  nroOperacion: string;
  fecha: string;
  monto: number;
}

export interface ListarArea extends Result {
  data: Area[];
}

export interface Area {
  codigo_Area_Gestion: string;
  descripcion_Area_Gestion: string;
  codigo_Clase: string;
}

export interface ListarProAreaIn {
  pareagestion: string;
  indicadorprocedimientognrl: string;
}

export interface ListarProAreaOut extends Result {
  data: ProcedimientoArea[];
}

export interface ProcedimientoArea {
  codigo_Procedimiento_Tupa: string;
  descripcion_Procedimieto_Tupa: string;
  indicador_Procedimiento_Espe: string;
}

export interface ListarBancos extends Result {
  data: Bancos[];
}

export interface Bancos {
  codigo_Banco: string;
  nombre_Banco: string;
}
