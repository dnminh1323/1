import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentValidationSchema } from './config/environment.validation';
import { BitrixModule } from './bitrix/bitrix.module';
import { GoogleSheetController } from './google-sheet/google-sheet.controller';
import { GoogleSheetModule } from './google-sheet/google-sheet.module';

@Module({
  imports: [ UtilsModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [appConfig, databaseConfig],
      validationSchema: environmentValidationSchema,
    }),
    BitrixModule,
    GoogleSheetModule,
  ],
  controllers: [AppController, GoogleSheetController],
  providers: [AppService],
})
export class AppModule {}
