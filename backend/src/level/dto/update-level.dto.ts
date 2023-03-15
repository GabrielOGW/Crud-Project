import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @IsString()
  nivel: string;
}
