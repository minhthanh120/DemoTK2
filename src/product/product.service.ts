import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { mapper } from 'src/mappings/mapper';
import { DeleteResult, Like, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}
    private readonly logger = new Logger(ProductService.name);

    applyScope(query:SelectQueryBuilder<Product>,
        user:any
    ):SelectQueryBuilder<Product>{
        const maxValue = user?.max_value? Number(user.max_value): null
        if(maxValue){
            query.andWhere('price < :maxprice',{maxprice: maxValue})
        }
        return query;
    }

    createProduct(inputProduct: ProductDTO): Promise<Product>{
        let product: Product = new Product();
        product = mapper.map(inputProduct, ProductDTO, Product);
        this.logger.log('created product!');
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

    findAllProduct(user):Promise<Product[]>{
        let query = this.productRepository.createQueryBuilder('product');
        query = this.applyScope(query,user);
        return query.getMany();
    }

    viewProduct(id:string):Promise<Product|null>{
        return this.productRepository.findOneBy({id});
    }

    search(key:string, user):Promise<Product[]>{
        let query = this.productRepository.createQueryBuilder('product').where('product.name LIKE :key',{key: `%${key}%`})
        query = this.applyScope(query, user);
        return query.getMany();
    }
}
