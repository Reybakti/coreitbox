import { Test, TestingModule } from '@nestjs/testing';
import { TicketMaterialsController } from './ticket-materials.controller';

describe('TicketMaterialsController', () => {
  let controller: TicketMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketMaterialsController],
    }).compile();

    controller = module.get<TicketMaterialsController>(TicketMaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
