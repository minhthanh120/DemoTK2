import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { mapper } from './mappings/mapper';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dto';
import { createMap } from '@automapper/core';


dotenvConfig({ path: '.env', override:false });

createMap(mapper, Product,ProductDTO);
createMap(mapper, ProductDTO,Product);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server is running on: http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
