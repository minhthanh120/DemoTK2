import { NestFactory } from '@nestjs/core';
import { ProductApiModule } from './product/product.api.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductApiModule);
  await app.listen(process.env.PORT?? 3001);
  console.log(`Server is running on http://localhost:${process.env.PORT??3001}`)
}
bootstrap();
