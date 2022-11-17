import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateLightDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lightName: string;

  @ApiProperty({
    enum: [0, 1],
  })
  @IsNotEmpty()
  @IsEnum([0, 1])
  mode: 0 | 1;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}
