import { Test, TestingModule } from '@nestjs/testing';
import { TicketDocumentationsController } from './ticket-documentations.controller';

describe('TicketDocumentationsController', () => {
  let controller: TicketDocumentationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketDocumentationsController],
    }).compile();

    controller = module.get<TicketDocumentationsController>(TicketDocumentationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
