import { Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsServiceService } from './providers/utils.service.service';
import { ClientProvider } from './providers/client.provider';

@Module({
  controllers: [UtilsController],
  providers: [UtilsServiceService, ClientProvider],
  exports: [UtilsServiceService, ClientProvider]
})
export class UtilsModule {}
