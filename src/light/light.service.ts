import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { UpdateLightDto } from './dto/update-light.dto';
import { LightData } from './entities/light-data.entity';
import { Light } from './entities/light.entity';

@Injectable()
export class LightService {
  constructor(
    @InjectRepository(Light)
    private readonly lightRepository: Repository<Light>,
    @InjectRepository(LightData)
    private readonly lightDataRepository: Repository<LightData>,
  ) {}

  createLight(light: Partial<Light>) {
    return this.lightRepository.save(light);
  }

  findLight(options: FindManyOptions<Light>) {
    return this.lightRepository.find(options);
  }

  findOneLight(options: FindOneOptions<Light>) {
    return this.lightRepository.findOne(options);
  }

  updateLight(options: FindOptionsWhere<Light>, data: UpdateLightDto) {
    return this.lightRepository.update(options, data);
  }

  async saveLightData(
    light: Light,
    lightData: Partial<LightData>,
  ): Promise<LightData> {
    return this.lightDataRepository.save({
      ...lightData,
      light,
    });
  }

  async getLightData(lightName: string): Promise<LightData[]> {
    const light = await this.lightRepository.findOne({
      where: {
        lightName,
      },
      relations: ['data'],
    });
    if (!light) throw new BadRequestException('Light not found');
    return light.data.slice(
      light.data.length >= 100 ? light.data.length - 100 : 0,
    );
  }
}
