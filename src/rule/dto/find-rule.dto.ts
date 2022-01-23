import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindRuleDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'ระบุว่าแต่ละ Paginate จะเอามากี่ Rule',
  })
  pageSize: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'ระบุว่าเอา Paginate ตัวที่เท่าไร',
  })
  pageNum: number;

  @IsOptional()
  field?: string;
}
