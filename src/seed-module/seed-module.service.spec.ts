import { Test, TestingModule } from '@nestjs/testing';
import { SeedModuleService } from './seed-module.service';

describe('SeedModuleService', () => {
  let service: SeedModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedModuleService],
    }).compile();

    service = module.get<SeedModuleService>(SeedModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
