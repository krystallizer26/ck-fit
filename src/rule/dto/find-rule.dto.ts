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
import { Gender } from '../../user/interfaces/gender.enum';
import { Level } from '../../user/interfaces/level.enum';
import { PaginationDto } from '../../_common/dto/pagination.dto';
import { SortingEnum } from '../../_common/interfaces/sorting.enum';

export class FindRuleDto extends PaginationDto {
  @IsOptional()
  field?: string;

  @IsOptional()
  @IsMongoId()
  idKeySearch?: string;

  @IsOptional()
  ruleKeySearch?: string;

  @IsOptional()
  descriptionKeySearch?: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'ส่วนที่เน้นในการออกกำลังกาย',
    isArray: true,
    enum: Gender
  })
  @IsEnum(Gender, { each: true })
  @ArrayMinSize(1)
  genderSearch?: Gender[];

  @IsOptional()
  @ApiProperty({
    description: 'ส่วนที่เน้นในการออกกำลังกาย',
    isArray: true,
    enum: Level
  })
  @IsEnum(Level, { each: true })
  @ArrayMinSize(1)
  fitLev?: Level[];

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'เรียงตามเวลาอัพเดทล่าสุด',
    enum: SortingEnum
  })
  @IsEnum(SortingEnum)
  lastUpdateSort?: SortingEnum;

}
