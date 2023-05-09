export interface Nivel {
  id: number;
  nivel: string;
  devs: any;
}

export interface Devs {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: string;
  idade: number;
  hobby: string;
  nivel_id: string;
}
