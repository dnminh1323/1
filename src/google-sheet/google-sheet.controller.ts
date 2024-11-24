import { Controller, Get } from '@nestjs/common';
import { GoogleSheetService } from './providers/google-sheet.service';

@Controller('google-sheet')
export class GoogleSheetController {
    constructor(
        /**
         *  Inject Google sheet service
         */
        private readonly googleSheetService: GoogleSheetService

    ) {}

    @Get()
    async getGoogleSheetData() {
        return this.googleSheetService.test();
    }       
}
