export interface Ubigeo {
  id: string;
  name: string;
}

export interface UbigeoProvincia extends Ubigeo {
  departamentoId: string;
}

export interface UbigeoDistrito extends UbigeoProvincia {
  provinciaId: string;
}
