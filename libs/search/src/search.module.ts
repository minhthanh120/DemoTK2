import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchModuleAsyncOptions, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

@Module({
  imports:[
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<ElasticsearchModuleOptions> => ({
        node: configService.get('ELASTICSEARCH_NODE','http://localhost:9200'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME',''),
          password: configService.get('ELASTICSEARCH_PASSWORD',''),
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [SearchService],
  exports: [SearchService,
    ElasticsearchModule],
})
export class SearchModule {}
