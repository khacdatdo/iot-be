import { Module } from '@nestjs/common';
import { LightService } from './light.service';
import { LightController } from './light.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Light } from './entities/light.entity';
import { LightData } from './entities/light-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Light, LightData])],
  providers: [LightService],
  controllers: [LightController],
  exports: [LightService],
})
export class LightModule {}
