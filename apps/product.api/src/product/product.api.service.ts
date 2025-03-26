import { CategoryDTO } from '@app/foundation.business/dto/category.dto';
import { ProductDTO } from '@app/foundation.business/dto/product.dto';
import { Category } from '@app/foundation.business/entity/category.entity';
import { ProductCategory } from '@app/foundation.business/entity/product-category.entity';
import { Product } from '@app/foundation.business/entity/product.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, In, Like, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class ProductApiService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>
    ){}
    private readonly logger = new Logger(ProductApiService.name);

    applyScope(query:SelectQueryBuilder<Product>,
        user:any
    ):SelectQueryBuilder<Product>{
        const maxValue = user?.attributes?.max_value? Number(user.attributes.max_value): null
        if(maxValue){
            query.andWhere('price < :maxprice',{maxprice: maxValue});
        }
        return query;
    }

    async createProduct(inputProduct: ProductDTO): Promise<Product>{
        let product: Product = new Product();
        product = Object.assign(new Product(), inputProduct);// mapper.map(inputProduct, ProductDTO, Product);
        this.logger.log('created product!');
        const result = await this.productRepository.save(product)
        let insCategories = inputProduct.categories.map(category => Object.assign(new Category(), category));
        await this.categoryRepository.upsert(insCategories,["name"])
        const savedCategories = await this.categoryRepository.find({
            where: { name: In(inputProduct.categories.map(c => c.name)) }
        });

        const productCategories = savedCategories.map(category => ({
            productId: product.id,
            categoryId: category.id
        }));

        await this.productCategoryRepository.insert(productCategories);
        return result;
    }

    async updateProduct(id:string, inputProduct: ProductDTO): Promise<Product>{
        const existingProduct = await this.productRepository.findOne({ where: { id } });
        if (!existingProduct) {
            throw new Error("Product not found");
        }

        existingProduct.name = inputProduct.name? inputProduct.name:existingProduct.name ;
        existingProduct.description = inputProduct.description? inputProduct.description:existingProduct.description;
        existingProduct.price = inputProduct.price? inputProduct.price:existingProduct.price;
        existingProduct.stock = inputProduct.stock? inputProduct.stock:existingProduct.stock;
        return this.productRepository.save(existingProduct);
    }

    removeProduct(id: string): Promise<DeleteResult>{
        return this.productRepository.delete(id);
    }

    async viewProduct(id:string):Promise<Product|null>{
        try{
            return await this.productRepository.findOneBy({id});
        }
        catch(error){
            console.log(`error: ${error.message}`)
            return Promise.resolve(null);
        }
    }

    findAllProducts(user, key?:string):Promise<Product[]>{
        try{

            let query = this.productRepository.createQueryBuilder('product');
            if(key){
                query = query.where('product.name LIKE :key',{key: `%${key}%`});
            }
            query = this.applyScope(query,user);
            return query.getMany();
        }
        catch(error){
            console.log(`error: ${error.message}`)
            return Promise.resolve([]);
        }
    }

}
