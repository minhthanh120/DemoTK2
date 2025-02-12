import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { mapper } from 'src/mappings/mapper';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}

    createProduct(inputProduct: ProductDTO): Promise<Product>{
        let product: Product = new Product();
        product = mapper.map(inputProduct, ProductDTO, Product);
        return this.productRepository.save(product);
    }
}
