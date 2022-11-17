import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LightDataDto {
  @ApiProperty()
  @IsNumber()
  brightness: number;
}
