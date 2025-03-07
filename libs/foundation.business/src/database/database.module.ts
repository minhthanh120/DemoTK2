import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath:'.env',
          //load:[databaseConfig]
        }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME','root'),
        password: configService.get<string>('DATABASE_PASSWORD','root'),
        database: configService.get<string>('DATABASE_NAME','testdatabase'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        timezone: 'Z',
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
