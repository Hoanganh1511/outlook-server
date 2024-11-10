import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  ValidateNested,
  IsArray,
  IsObject,
} from 'class-validator';
class AddressDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail() // Validate email format
  address: string;
}

export class SendEmailDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto) // Transform plain object into AddressDto
  from?: AddressDto;

  @IsArray()
  @ValidateNested({ each: true }) // Validate each recipient as an AddressDto
  @Type(() => AddressDto) // Transform plain object into AddressDto
  recipients: AddressDto[];

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsObject()
  placeholderReplacements?: Record<string, string>;
}
