export enum DocumentoResolutivoIdEnum {
  INFORMACION_DEL_EXPEDIENTE = 'INFORMACION_DEL_EXPEDIENTE',
  OBSERVACIONES = 'OBSERVACIONES',
  DERIVACION_DOCUMENTOS_RESOLUTIVOS = 'DERIVACION_DOCUMENTOS_RESOLUTIVOS',
  TRAZABILIDAD = 'TRAZABILIDAD',
}

export interface DocumentoResolutivoInterface {
  id: DocumentoResolutivoIdEnum;
  name: string;
  active: boolean;
}
