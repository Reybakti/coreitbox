import { Test, TestingModule } from '@nestjs/testing';
import { TicketTimelineService } from './ticket-timeline.service';

describe('TicketTimelineService', () => {
  let service: TicketTimelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTimelineService],
    }).compile();

    service = module.get<TicketTimelineService>(TicketTimelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
