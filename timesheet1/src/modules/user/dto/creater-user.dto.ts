import { ApiProperty } from '@nestjs/swagger';
import { sexType } from '@src/common/constants/sexType';
import { LowercaseTransform } from '@src/common/constants/transformersToLowerCase';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
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
  @IsOptional()
  branchId?: number;

  @IsNumber()
  @IsOptional()
  typeId?: number;

  @IsNumber()
  @IsOptional()
  levelId?: number;

  @IsNumber()
  @IsOptional()
  positionId?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsString()
  @IsOptional()
  bank_account?: string;

  @IsString()
  @IsOptional()
  current_address?: string;
}
