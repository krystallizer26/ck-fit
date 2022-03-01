import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class PaginationDto {
    
  @IsNotEmpty()
  @Type(() => Number) // แปลงค่าก่อน แล้วค่อยเช็คว่าเป็นเลขหรือไม่
  @IsInt()
  @Min(1)
  @ApiProperty({
    required: true,
    description: 'ระบุว่าแต่ละ Paginate จะเอามากี่ตัว (ดึงครั้งละเท่าไร)',
  })
  pageSize: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    required: true,
    description: 'ระบุว่าดึง Paginate ครั้งที่เท่าไร (เริ่มจาก 1)',
  })
  pageNum: number;
}
