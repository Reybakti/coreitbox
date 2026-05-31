import { Test, TestingModule } from '@nestjs/testing';
import { TicketTimelineController } from './ticket-timeline.controller';

describe('TicketTimelineController', () => {
  let controller: TicketTimelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketTimelineController],
    }).compile();

    controller = module.get<TicketTimelineController>(TicketTimelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
