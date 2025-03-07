import { Test, TestingModule } from '@nestjs/testing';
import { FoundationBusinessService } from './foundation.business.service';

describe('FoundationBusinessService', () => {
  let service: FoundationBusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoundationBusinessService],
    }).compile();

    service = module.get<FoundationBusinessService>(FoundationBusinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
