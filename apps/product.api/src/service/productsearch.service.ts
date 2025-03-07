import { ProductDocument } from '@app/foundation.business/documents/product.document';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ProductSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }
  private readonly index = "products";
  async indexProduct(product: ProductDocument) {
    return this.elasticsearchService.index<ProductDocument>({
      index: this.index,
      id:product.id,
      body: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        categories: product.categories.sort((a, b) => a.name.localeCompare(b.name)),
      }
    });
  }

  async getProductById(id: string): Promise<ProductDocument | null> {
    try {
        const response = await this.elasticsearchService.get<ProductDocument>({
            index: this.index,
            id: id
        });
        return response?._source || null;
    } catch (error) {
        return null;
    }
}

  async removeProduct(id: string){
    const exists = await this.elasticsearchService.exists({
      index:this.index,
      id:id
    });
    if(exists){
      return await this.elasticsearchService.delete({
        index:this.index,
        id:id,
      });
    }
    console.warn(`Product with ID ${id} does not exist in Elasticsearch`);
    return { message: 'Product not found in Elasticsearch' };
  }
}
