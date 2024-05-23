import { Result } from 'src/app/shared/interfaces/shared.interface';

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

export interface ListarTipoDocumentos extends Result {
  data: TipoDocumentos[];
}

export interface TipoDocumentos {
  codigdocumento: string;
  descripcionTipoDocumento: string;
  descripcionCompleta: string;
}
