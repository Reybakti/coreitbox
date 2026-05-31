import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TicketDocumentationsController } from './ticket-documentations.controller';
import { TicketDocumentationsService } from './ticket-documentations.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    TicketDocumentationsController,
  ],
  providers: [
    TicketDocumentationsService,
  ],
})
export class TicketDocumentationsModule {}