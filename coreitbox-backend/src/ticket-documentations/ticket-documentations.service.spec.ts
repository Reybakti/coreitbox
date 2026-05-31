import { Test, TestingModule } from '@nestjs/testing';
import { TicketDocumentationsService } from './ticket-documentations.service';

describe('TicketDocumentationsService', () => {
  let service: TicketDocumentationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketDocumentationsService],
    }).compile();

    service = module.get<TicketDocumentationsService>(TicketDocumentationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
