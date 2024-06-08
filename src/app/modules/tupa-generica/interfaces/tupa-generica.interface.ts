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
  centroPoblado: string;
  correoElectronico: string;
  direccion: string;
  documentoNumero: string;
  documentoTipo: string;
  estadoJuridico: string;
  estadoNatural: string;
  fechaAlta: string;
  fechaBaja: string;
  fechaNacimiento: string;
  id: string;
  nombreComercial: string;
  nombreRazonSocial: string;
  nombres: string;
  pais: string;
  personaTipo: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  departamento: string;
  provincia: string;
  distrito: string;
  referenciaDireccion: string;
  ruc: string;
  telefono: string;
  telefonoMovil: string;
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
  nombres: string;
  direccion: string;
  departamento_Id: string;
  nomb_Dpto_Dpt: string;
  provincia_Id: string;
  nomb_Prov_Tpr: string;
  distrito_Id: string;
  dodi_Dist_Tdi: string;
  telefono: string;
  centro_Poblado_Id: string;
  telefono_Movil: string;
  correo_Electronico: string;
  referencia: string;
  pais_Id: string;
  fecha_Nacimiento: string;
  nombre_Razsoc_Comp: string;
  estado: string;
  estado_1: string;
  cargo: string;
  fecha_Desde: string;
  persona_Id: string;
}

export interface AgregarUsuarioIn {
  //EcfcapGi
  p_Persona_Id: string;
  p_Nombre_Razon_Social: string;
  p_Persona_Tipo: string;
  p_Documento_Tipo: string;
  p_Documento_Numero: string;
  p_Ruc: string;
  p_Direccion: string;
  p_Departamento_Id: string;
  p_Provincia_Id: string;
  p_Distrito_Id: string;
  p_Telefono: string;
  p_Telefono_Movil: string;
  p_Correo_Electronico: string;
  p_Fecha_Nacimiento: string;
  p_Referencia_Direccion: string;
  p_Fecha_Alta: string;
  p_Fecha_Baja: string;
  p_Nombre_Comercial: string;
  p_Estado_Juridico: string;
  p_Sincronizacion_Estado: string;
  p_Sincronizacion_Fecha: string;
  p_Usuario: string;
}

export interface AgregarUsuarioOut extends Result {
  data: string;
}
