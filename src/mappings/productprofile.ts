import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/entity/product.entity';
import { ProductDTO } from 'src/dto/product.dto';

@Injectable()
export class ProductProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Product, ProductDTO);
            createMap(mapper, ProductDTO, Product);
        };
    }
}