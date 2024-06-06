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

export interface SolicitanteIn {
  ptidodoc?: string;
  pnumdoc?: string;
  pnombre?: string;
}

export interface SolicitanteOut extends Result {
  data: Solicitante2[];
}

export interface Solicitante2 {
  persona_Id: string;
  nombre_Razon_Social: string;
  persona_Tipo: string;
  documento_Tipo: string;
  documento_Numero: string;
  apellido_Paterno: string;
  apellido_Materno: string;
  nombres: string;
  direccion: string;
  departamento_Id: string;
  nomb_Dpto_Dpt: string;
  provincia_Id: string;
  nomb_Prov_Tpr: string;
  distrito_Id: string;
  nomb_Dist_Tdi: string;
  telefono: string;
  centro_Poblado_Id: string;
  telefono_Movil: string;
  correo_Electronico: string;
  referencia_Direccion: string;
  estado: string;
  pais_Id: string;
  fecha_Nacimiento: string;
  nombre_Razsoc_Comp: string;
  regi_Padr_Emp: string;
}

export interface Ubigeo {
  id: null;
  name: string;
  departamentoId?: string;
  provinciaId?: string;
}

export interface RegistroUsuario {
  apellidoMaterno: string;
  apellidoPaterno: string;
  centroPoblado: null;
  correoElectronico: null;
  direccion: string;
  documentoNumero: string;
  documentoTipo: null;
  estadoJuridico: string;
  estadoNatural: string;
  fechaAlta: null;
  fechaBaja: null;
  fechaNacimiento: null;
  id: null;
  nombreComercial: null;
  nombreRazonSocial: string;
  nombres: string;
  pais: null;
  personaTipo: null;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  departamento: string;
  provincia: string;
  distrito: string;
  referenciaDireccion: string;
  ruc: null;
  telefono: null;
  telefonoMovil: null;
  representantes: any[];
}

export interface RepresentateOut extends Result {
  data: Representante[];
}

export interface Representante {
  representante_Id: number;
  nombre_Razon_Social: string;
  persona_Tipo: string;
  documento_Tipo: string;
  documento_Numero: string;
  apellido_Paterno: string;
  apellido_Materno: string;
  nombres: null;
  direccion: null;
  departamento_Id: null;
  nomb_Dpto_Dpt: null;
  provincia_Id: null;
  nomb_Prov_Tpr: null;
  distrito_Id: null;
  dodi_Dist_Tdi: null;
  telefono: null;
  centro_Poblado_Id: null;
  telefono_Movil: null;
  correo_Electronico: null;
  referencia: null;
  pais_Id: null;
  fecha_Nacimiento: null;
  nombre_Razsoc_Comp: null;
  estado: null;
  estado_1: null;
  cargo: string;
  fecha_Desde: null;
  persona_Id: null;
}
