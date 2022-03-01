import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMinSize,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email ของ Admin',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password ของ Admin',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ชื่อของ Admin',
  })
  name: string;

  createDate: Date;
}
