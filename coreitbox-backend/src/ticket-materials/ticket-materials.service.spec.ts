import { Test, TestingModule } from '@nestjs/testing';
import { TicketMaterialsService } from './ticket-materials.service';

describe('TicketMaterialsService', () => {
  let service: TicketMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketMaterialsService],
    }).compile();

    service = module.get<TicketMaterialsService>(TicketMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
