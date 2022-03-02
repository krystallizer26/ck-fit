import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Admin } from '../../admin/schemas/admin.schema';
import { BodyPart } from '../../user/interfaces/body-part.enum';
import { Gender } from '../../user/interfaces/gender.enum';
import { Level } from '../../user/interfaces/level.enum';
import { Video } from '../../video/schemas/video.schema';
import { RangeDto } from '../../_common/dto/range.dto copy';
import { Activity } from '../schemas/activity.schema';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ชื่อของวิดิโอ',
  })
  ruleName: string;

  @IsString()
  @ApiProperty({
    description:
      'คำอธิบายของวิดิโอนี้ จะ Encode มาเป็น Html Doc ก็ได้ แต่จะคืนไปแบบเดิม',
  })
  description: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RangeDto)
  @ApiProperty({
    description: 'ขอบเขตของอายุตามกฎนี้',
  })
  ageRange!: RangeDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RangeDto)
  @ApiProperty({
    description: 'ขอบเขตของน้ำหนักตามกฎนี้',
  })
  weightRange!: RangeDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RangeDto)
  @ApiProperty({
    description: 'ขอบเขตของความสูงตามกฎนี้',
  })
  heightRange!: RangeDto;

  @ApiProperty({
    description: 'เพศที่รองรับในกฎนี้',
    isArray: true,
    enum: Gender,
  })
  @IsEnum(Gender, { each: true })
  @ArrayMinSize(1)
  gender: Gender[];

  @ApiProperty({
    description: 'เลเวลที่รองรับในกฎนี้',
    isArray: true,
    enum: Level,
  })
  @IsEnum(Level, { each: true })
  @ArrayMinSize(1)
  level: Level[];

  @ApiProperty({
    description: 'ส่วนในร่างกายที่รองรับในกฎนี้',
    isArray: true,
    enum: BodyPart,
  })
  @IsEnum(BodyPart, { each: true })
  @ArrayMinSize(1)
  focused: BodyPart[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  numberDay: number;

  createdBy: Admin;

  createDate: Date;

  lastUpdatedDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ActivityDto)
  activity: ActivityDto[];
}

export class ActivityDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  video: Video;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  loop: number;
}
