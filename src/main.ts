import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mapper } from './mappings/mapper';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dto';
import { createMap } from '@automapper/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


createMap(mapper, Product,ProductDTO);
createMap(mapper, ProductDTO,Product);

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:['log','debug','error','warn'],});
  const config = new DocumentBuilder()
    .setTitle('Demo APIs')
    .setDescription(' The Demo API description')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server is running on: http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
