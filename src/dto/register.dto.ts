import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Credentials {
  @IsString()
  type: string;

  @IsString()
  value: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  enabled: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Credentials)
  credentials: Credentials[];
}
