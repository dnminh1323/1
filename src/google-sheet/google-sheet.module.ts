import { Module } from '@nestjs/common';
import { GoogleSheetService } from './providers/google-sheet.service';
import { GoogleAuthProvider } from './providers/google-auth.provider';
import { GoogleSheetConnectorProvider } from './providers/google-sheet-connector.provider';
import { ConfigService } from '@nestjs/config';
import GoogleSheetConnectorDto from './dto/google-sheet-connector.dto';
import { GoogleSheetController } from './google-sheet.controller';


@Module({
  providers: [
    GoogleSheetService, 
    GoogleAuthProvider,
    {
      provide: 'GOOGLE_SHEET_CONNECTOR',
      useFactory: async (configService: ConfigService) => {
        const connectorDto = new GoogleSheetConnectorDto({
          type: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_TYPE'),
          project_id: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_PROJECT_ID'),
          private_key_id: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID'),
          private_key: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY').replace(/\\n/g, '\n'),
          client_email: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL'),
          client_id: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_CLIENT_ID'),
          auth_uri: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_AUTH_URI'),
          token_uri: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_TOKEN_URI'),
          auth_provider_x509_cert_url: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL'),
          client_x509_cert_url: configService.get<string>('GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL'),
        });
        return connectorDto;
      },
      inject: [ConfigService]
    }, 
    GoogleSheetConnectorProvider
  ],
  controllers: [GoogleSheetController],
  exports: [GoogleSheetService]
})
export class GoogleSheetModule {}
