import { PartialType } from '@nestjs/swagger';
import { CreateDevDto } from './create-dev.dto';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class UpdateDevDto extends PartialType(CreateDevDto) {
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