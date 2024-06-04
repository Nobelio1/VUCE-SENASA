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

export interface Solicitante {
  id: string;
  nombreRazonSocial: string;
  type: string;
  documentTypeId: string;
  documentNumber: string;
  lastName: string;
  secondaryName: string;
  names: string;
  ruc: string;
  address: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  centroPobladoId: null;
  phone: string;
  gender: null;
  cellphone: string;
  email: string;
  referen: null;
  paisId: null;
  dateOfBirth: Date;
  nameRazsocComp: null;
  addressReferen: string;
  highDate: Date;
  lowDate: null;
  tradename: null;
  state: null;
  naturalState: string;
  legalState: string;
  syncState: string;
  userCreated: null;
  createdAt: Date;
  userUpdated: string;
  updatedAt: Date;
  syncDate: Date;
  ubigeo: Ubigeo;
  poblado: null;
  documentType: DocumentType;
  ubigeoId: string;
  ubigeoPobladoId: null;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  state: string;
  userCreatedAt: string;
  userUpdatedAt: string;
  createdAt: Date;
  updateAt: Date;
}

export interface Ubigeo {
  id: null;
  name: string;
  departamentoId?: string;
  provinciaId?: string;
}
