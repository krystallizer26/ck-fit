import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BodyPart } from '../interfaces/body-part.enum';
import { DaysInWeek } from '../interfaces/daysInWeek.enum';
import { Gender } from '../interfaces/gender.enum';
import { Level } from '../interfaces/level.enum';
import { Target } from '../interfaces/target.enum';

export class CreateUserDto {
  firebaseUserId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'เพศสภาพ',
    enum: Gender
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'เป้าหมายในการออกกำลังกาย',
    isArray: true,
    enum: Target
  })
  @IsEnum(Target, { each: true })
  @ArrayMinSize(1)
  target: Target[];

  @ApiProperty({
    description: 'ส่วนที่เน้นในการออกกำลังกาย',
    isArray: true,
    enum: BodyPart
  })
  @IsEnum(BodyPart, { each: true })
  @ArrayMinSize(1)
  bodyPart: BodyPart[];

  @ApiProperty({
    description: 'ความยากในการออกกำลังกาย',
    enum: Level
  })
  @IsEnum(Level)
  level: Level;

  @ApiProperty({
    description: 'วันที่จะการออกกำลังกาย',
    isArray: true,
    enum: DaysInWeek
  })
  @IsEnum(DaysInWeek, { each: true })
  @ArrayMinSize(1)
  excerciseDay: DaysInWeek[];

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  exerciseTimeStart: Date;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  exerciseTimeFinish: Date;

  createDate: Date;
}
