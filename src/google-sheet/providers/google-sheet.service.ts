import { Injectable } from '@nestjs/common';
import { GoogleAuthProvider } from './google-auth.provider';
import {JWT} from "google-auth-library";
import {google, sheets_v4} from "googleapis";
import {GaxiosPromise} from "googleapis-common";
import { GoogleSheetConnectorProvider } from './google-sheet-connector.provider';

@Injectable()
export class GoogleSheetService {
    constructor(
        /**
         * Inject Google sheet connector provider
         */
        private readonly sheet: GoogleSheetConnectorProvider
    ) {}    
    async test() {
        return this.sheet.loadSpreadSheet('1vc5BiFes2mE96HQa75J66Xc2hAsCZQYxGuYd7TnyVHM');
    }
}
