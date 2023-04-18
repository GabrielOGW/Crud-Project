import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';

@Controller('nivel')
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}

  @Post()
  create(@Body() createNivelDto: CreateNivelDto): Promise<Nivel> {
    return this.nivelService.create(createNivelDto);
  }

  @Get()
  findAll(): Promise<Nivel[]> {
    return this.nivelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Nivel> {
    return this.nivelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNivelDto: UpdateNivelDto) {
    return this.nivelService.update(id, updateNivelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.nivelService.remove(id);
  }
}
