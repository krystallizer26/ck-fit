import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Admin } from '../../admin/schemas/admin.schema';
import { BodyPart } from '../../user/interfaces/body-part.enum';
import { BilingualDto } from '../../_common/dto/bilingual.dto';

export class CreateVideoDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BilingualDto)
  @ApiProperty({
    description: 'URL ของวิดิโอ',
  })
  videoUrl!: BilingualDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BilingualDto)
  @ApiProperty({
    description: 'ชื่อของวิดิโอ',
  })
  videoName!: BilingualDto;

  @ApiProperty({
    description: 'ส่วนที่เน้นในการออกกำลังกาย',
    isArray: true,
    enum: BodyPart
  })
  @IsEnum(BodyPart, { each: true })
  @ArrayMinSize(1)
  focused: BodyPart[];

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'สถานะการเป็นวิดิโอสาธารณะ (true = สาธารณะ)',
  })
  public: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ระยะเวลาของวิดิโอ (วินาที)',
  })
  videoTime: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'แคลอรี่ที่เบิร์นได้ของวิดิโอนี้',
  })
  burn: number;

  @ApiProperty({
    description: 'อุปกรณ์ที่ต้องใช้ของวิดิโอนี้',
    isArray: true,
  })
  @IsArray()
  equipment: string[];
 
  
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BilingualDto)
  @ApiProperty({
    description: 'คำอธิบายของวิดิโอนี้ จะ Encode มาเป็น Html Doc ก็ได้ แต่จะคืนไปแบบเดิม',
  })
  guidance!: BilingualDto;

  createdBy: Admin;

  createDate: Date;
}
