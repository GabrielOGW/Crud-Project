import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateDevDto {
  @IsString()
  nome: string;

  @IsString()
  sexo: string;

  @IsDate()
  dataNascimento: string;

  @IsNumber()
  idade: number;

  @IsString()
  hobby: string;
}
