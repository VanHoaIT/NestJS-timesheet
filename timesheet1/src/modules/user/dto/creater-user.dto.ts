import { ApiProperty } from '@nestjs/swagger';
import { sexType } from '@src/common/constants/sexType';
import { LowercaseTransform } from '@src/common/constants/transformersToLowerCase';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @LowercaseTransform()
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @ApiProperty()
  password: string;

  @IsEnum(sexType, { message: 'Invalid sex type' })
  @ApiProperty()
  sex: sexType;

  @IsNumber()
  branchId: number;

  @IsNumber()
  typeId: number;

  @IsNumber()
  levelId: number;

  @IsNumber()
  postition: number;
}
