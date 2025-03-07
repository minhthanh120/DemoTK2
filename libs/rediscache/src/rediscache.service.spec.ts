import { Test, TestingModule } from '@nestjs/testing';
import { RediscacheService } from './rediscache.service';

describe('RediscacheService', () => {
  let service: RediscacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RediscacheService],
    }).compile();

    service = module.get<RediscacheService>(RediscacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
