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
