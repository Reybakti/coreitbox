import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TicketMaterialsController } from './ticket-materials.controller';
import { TicketMaterialsService } from './ticket-materials.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    TicketMaterialsController,
  ],
  providers: [
    TicketMaterialsService,
  ],
})
export class TicketMaterialsModule {}