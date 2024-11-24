import { Module } from '@nestjs/common';
import { BitrixController } from './bitrix.controller';
import { BitrixService } from './providers/bitrix.service';
import { Auth } from './providers/auth';
import { CallMethod } from './providers/call-method';

@Module({
  controllers: [BitrixController],
  providers: [BitrixService, Auth, CallMethod],
  exports: [CallMethod, Auth]
})
export class BitrixModule {}
