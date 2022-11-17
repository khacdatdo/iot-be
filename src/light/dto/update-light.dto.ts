import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateLightDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum([0, 1])
  mode?: 0 | 1;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
