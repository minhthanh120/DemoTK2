import { Injectable } from '@nestjs/common';
import { Product } from '@app/foundation.business/entity/product.entity';
@Injectable()
export class ProductApiService {
  getHello(): string {
    const res = new Product();
    return 'Hello World!';
  }
}
