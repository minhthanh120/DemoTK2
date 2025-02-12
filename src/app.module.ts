import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import databaseConfig from './config/database.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load:[databaseConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async(configService:ConfigService)=>{
      const config = configService.get<TypeOrmModule>('typeorm');
      if(!config){
        throw new Error('Missing TypeORM config');
      }
      return config;
    }
  }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
