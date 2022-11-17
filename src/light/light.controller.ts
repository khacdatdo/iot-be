import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { CreateLightDto } from './dto/create-light.dto';
import { LightDataDto } from './dto/save-light-data.dto';
import { UpdateLightDto } from './dto/update-light.dto';
import { LightData } from './entities/light-data.entity';
import { Light } from './entities/light.entity';
import { LightService } from './light.service';

@Controller('light')
@ApiTags('Light')
export class LightController {
  constructor(private readonly lightService: LightService) {}

  @Post()
  async createLight(@Body() light: CreateLightDto): Promise<Light> {
    const existed = await this.lightService.findOneLight({
      where: {
        lightName: light.lightName,
      },
    });
    if (existed) throw new BadRequestException('Light name already exists');
    return this.lightService.createLight(light);
  }

  @Get()
  async getAllLight(): Promise<Light[]> {
    return this.lightService.findLight({});
  }

  @Get(':lightName')
  async getLightByName(@Param('lightName') lightName: string): Promise<Light> {
    const light = await this.lightService.findOneLight({
      where: {
        lightName,
      },
    });
    if (!light) throw new BadRequestException('Light not found');
    return light;
  }

  @Patch(':lightName')
  async updateLightByName(
    @Param('lightName') lightName: string,
    @Body() data: UpdateLightDto,
  ): Promise<UpdateResult> {
    return this.lightService.updateLight(
      {
        lightName,
      },
      data,
    );
  }

  @Post(':lightName/data')
  async saveLightDataByName(
    @Param('lightName') lightName: string,
    @Body() lightData: LightDataDto,
  ): Promise<LightData> {
    const light = await this.lightService.findOneLight({
      where: {
        lightName,
      },
    });
    if (!light) throw new BadRequestException('Light not found');
    return this.lightService.saveLightData(light, lightData);
  }

  @Get(':lightName/data')
  async getLightDataByName(
    @Param('lightName') lightName: string,
  ): Promise<LightData[]> {
    const light = await this.lightService.findOneLight({
      where: {
        lightName,
      },
    });
    if (!light) throw new BadRequestException('Light not found');
    return this.lightService.getLightData(lightName);
  }
}
