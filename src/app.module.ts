import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigService:ConfigService)=>({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'testdatabase',
      entities: [User], // Hoặc autoLoadEntities: true
      autoLoadEntities: true, // Tự động nhận diện entities
      synchronize: false, // Chỉ true khi phát triển, production nên false
      migrations:['dist/migrations/*.js'],
      migrationsTableName:'migrations'
    })
    })
],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
