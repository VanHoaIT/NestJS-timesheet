import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bank?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bank_account?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  current_address?: string;
}
