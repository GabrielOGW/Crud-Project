import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';
import { CreateNivelService } from './services/create-nivel.service';
import { DeleteNivelService } from './services/delete-nivel.service';
import { FindManyNivelService } from './services/find-many-nivel.service';
import { FindNivelService } from './services/find-nivel.service';
import { UpdateNivelService } from './services/update-nivel.service';

@Controller('nivel')
export class NivelController {
  constructor(
    private readonly createNivelService: CreateNivelService,
    private readonly findNivelService: FindNivelService,
    private readonly findManyNivelService: FindManyNivelService,
    private readonly updateNivelService: UpdateNivelService,
    private readonly deleteNivelService: DeleteNivelService,
  ) {}

  @Post()
  create(@Body() createNivelDto: CreateNivelDto): Promise<Nivel> {
    return this.createNivelService.create(createNivelDto);
  }

  @Get()
  findAll(): Promise<Nivel[]> {
    return this.findManyNivelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Nivel> {
    return this.findNivelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateNivelDto: UpdateNivelDto,
  ): Promise<Nivel> {
    return this.updateNivelService.update(id, updateNivelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.deleteNivelService.remove(id);
  }
}
