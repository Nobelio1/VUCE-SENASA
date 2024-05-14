export enum TupaGenericaIdEnum {
  DATOS_SOLICITANTE = 'DATOS_SOLICITANTE',
  DETALLE = 'DETALLE',
  INFO_EXPEDIENTE = 'INFO_EXPEDIENTE',
}

export interface TupaGenericaInterface {
  id: TupaGenericaIdEnum;
  name: string;
  active: boolean;
}
