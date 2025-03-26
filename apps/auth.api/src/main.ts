import { NestFactory } from '@nestjs/core';
import { AuthApiModule } from './auth/auth.api.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthApiModule);
  await app.listen(process.env.PORT ?? 3002);
  console.log(`🚀 Server is running on: http://localhost:${process.env.PORT ?? 3002}`);
}
bootstrap();
