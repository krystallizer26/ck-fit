import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMinSize,
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Admin } from '../../admin/schemas/admin.schema';
import { Video } from '../../video/schemas/video.schema';

export class CreateRuleDto {
  @ApiProperty({
    description: 'ลิงค์ของวิดิโอ จะที่อัพบนยูทูป หรืออัพบนเซิฟเอร์ตัวเองก็ได้ ขอแค่สามารถเข้าถึงได้แบบ public',
    isArray: true,
  })
  @ArrayMinSize(1)
  videoUrl: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ชื่อของวิดิโอ',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ระยะเวลาของวิดิโอ (วินาที)',
  })
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'แคลอรี่ที่เบิร์นได้ของวิดิโอนี้',
  })
  cal: number;

  @ApiProperty({
    description: 'อุปกรณ์ที่ต้องใช้ของวิดิโอนี้',
    isArray: true,
  })
  @IsArray()
  equipment: string[];

  @IsString()
  @ApiProperty({
    description: 'คำอธิบายของวิดิโอนี้ จะ Encode มาเป็น Html Doc ก็ได้ แต่จะคืนไปแบบเดิม',
  })
  description: string;

  createdBy: Admin;

  video: Video;

  createDate: Date;
}
