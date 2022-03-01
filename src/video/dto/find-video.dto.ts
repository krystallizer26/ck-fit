import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BodyPart } from '../../user/interfaces/body-part.enum';
import { PaginationDto } from '../../_common/dto/pagination.dto';
import { SortingEnum } from '../../_common/interfaces/sorting.enum';

export class FindVideoDto extends PaginationDto {
  @IsOptional()
  field?: string;

  @IsOptional()
  @IsMongoId()
  idKeySearch?: string;

  @IsOptional()
  videoKeySearch?: string;

  @IsOptional()
  publicSearch?: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'ส่วนที่เน้นในการออกกำลังกาย',
    isArray: true,
    enum: BodyPart
  })
  @IsEnum(BodyPart, { each: true })
  @ArrayMinSize(1)
  focusedSearch?: BodyPart[];

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'เรียงตามความยาววิดิโอ',
    enum: SortingEnum
  })
  @IsEnum(SortingEnum)
  timeSort?: SortingEnum;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'เรียงตามแคลอรีที่เบิร์นได้',
    enum: SortingEnum
  })
  @IsEnum(SortingEnum)
  burnSort?: SortingEnum;

  @IsOptional()
  @ApiProperty({
    description: 'อุปกรณ์ที่ต้องใช้ของวิดิโอนี้',
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  equipmentSearch?: string[];
}
