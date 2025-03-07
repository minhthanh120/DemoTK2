import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
    IsAlphanumeric,
    IsArray,
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
    ValidateNested,
  } from 'class-validator';
import { CreateDateColumn } from 'typeorm';
import { CategoryDTO } from './category.dto';

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    categories: CategoryDTO[];
}