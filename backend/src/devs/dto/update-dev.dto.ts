import { PartialType } from '@nestjs/swagger';
import { CreateDevDto } from './create-dev.dto';

export class UpdateDevDto extends PartialType(CreateDevDto) {
  nome: string;

  sexo: string;

  dataNascimento: string;

  idade: number;

  hobby: string;
}
