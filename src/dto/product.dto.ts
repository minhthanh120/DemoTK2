import { AutoMap } from '@automapper/classes';
import {
    IsAlphanumeric,
    IsDate,
    IsDecimal,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    Min,
    MinLength,
  } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class ProductDTO{
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    name: string;
    
    @IsString()
    @AutoMap()
    description:string;

    @IsDecimal({decimal_digits: '1,'})
    @AutoMap()
    stock:number;

    @IsInt()
    @Min(0)
    @AutoMap()
    price:number;

    @IsDate()
    @AutoMap()
    createdAt: Date;

    @IsDate()
    @AutoMap()
    updatedAt: Date;
}