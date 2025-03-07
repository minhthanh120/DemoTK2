import { Module } from '@nestjs/common';
import { FoundationBusinessService } from './foundation.business.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database/database.config';

@Module({
  providers: [FoundationBusinessService],
  exports: [FoundationBusinessService,
    DatabaseModule],
  imports: [DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
      load:[databaseConfig]
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async(configService:ConfigService)=>{
    //     const config = configService.get<TypeOrmModule>('typeorm');
    //     if(!config){
    //       throw new Error('Missing TypeORM config');
    //     }
    //     return config;
    //   }
    // })
  ],
})
export class FoundationBusinessModule {}
