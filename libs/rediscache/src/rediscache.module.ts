import { Module } from '@nestjs/common';
import { RedisCacheService } from './rediscache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';

@Module({
  imports:[CacheModule.registerAsync({
    isGlobal:true,
    inject:[ConfigService],
    useFactory: async (configService:ConfigService) => {
      return {
        stores: [
          new Keyv({
            store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
          }),
          createKeyv(configService.get<string>('REDIS_URI','')),
        ],
      };
    },
  })],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
