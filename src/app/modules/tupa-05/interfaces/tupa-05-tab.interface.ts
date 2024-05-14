export enum Tupa05TabIdEnum {
  PARTE_I = 'PARTE_I',
  PARTE_II = 'PARTE_II',
  PARTE_III = 'PARTE_III',
  PARTE_IV = 'PARTE_IV',
  PARTE_V = 'PARTE_V',
}

export interface Tupa05TabInterface {
  id: Tupa05TabIdEnum;
  name: string;
  active: boolean;
}
