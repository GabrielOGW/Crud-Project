import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Dev } from './entities/dev.entity';
import { CreateDevService } from './services/create-dev.service';
import { FindDevService } from './services/find-dev.service';
import { FindManyDevService } from './services/find-many-dev.service';
import { UpdateDevService } from './services/update-dev.service';
import { DeleteDevService } from './services/delete-dev.service';

@Controller('developers')
export class DevsController {
  constructor(
    private readonly createDevService: CreateDevService,
    private readonly findDevService: FindDevService,
    private readonly findManyDevService: FindManyDevService,
    private readonly updateDevService: UpdateDevService,
    private readonly deleteDevService: DeleteDevService,
  ) {}

  @Post()
  create(@Body() createDevDto: CreateDevDto): Promise<Dev> {
    return this.createDevService.create(createDevDto);
  }

  @Get()
  findAll(): Promise<Dev[]> {
    return this.findManyDevService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Dev> {
    return this.findDevService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDevDto: UpdateDevDto,
  ): Promise<Dev> {
    return this.updateDevService.update(id, updateDevDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.deleteDevService.remove(id);
  }
}
