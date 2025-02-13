import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { mapper } from 'src/mappings/mapper';
import { DeleteResult, Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}
    private readonly logger = new Logger(ProductService.name);
    createProduct(inputProduct: ProductDTO): Promise<Product>{
        let product: Product = new Product();
        product = mapper.map(inputProduct, ProductDTO, Product);
        this.logger.log('create product!');
        return this.productRepository.save(product);
    }

    updateProduct(id:string, inputProduct: ProductDTO): Promise<Product>{
        let product = new Product();
        product.name = inputProduct.name;
        product.description = inputProduct.description;
        product.price =inputProduct.price;
        product.stock = inputProduct.stock;
        product.id = id;
        return this.productRepository.save(product);
    }

    removeProduct(id: string): Promise<DeleteResult>{
        return this.productRepository.delete(id);
    }

    findAllProduct():Promise<Product[]>{
        return this.productRepository.find();
    }

    viewProduct(id:string):Promise<Product|null>{
        return this.productRepository.findOneBy({id});
    }

    search(key:string):Promise<Product[]>{
        return this.productRepository.find({where:[{name: Like(`%${key}%`)}]})
    }
}
