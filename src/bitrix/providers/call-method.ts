import axios, { AxiosInstance, AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from './auth';

/**
 * Bitrix24 REST API.
 * @param method - ví dụ: 'user.get'
 * @param payload - Đối tượng 
 * @returns {Promise<any>} - promise
 */

interface Payload {
    params?: Record<string, string>;
    ID?: string;
    [key: string]: any;
}

interface Token {
    refresh_token: string;
    access_token: string;
}

@Injectable()
export class CallMethod {
    public BITRIX24_DOMAIN: string;
    private client: AxiosInstance;
    private token: Token | null = null;

    constructor(
        /**
         * Inject config service
         */
        private readonly configService: ConfigService,
        private readonly auth: Auth,
    ) {
        this.BITRIX24_DOMAIN = this.configService.get<string>('BITRIX24_DOMAIN') || '';
        this.client = axios.create({ baseURL: `https://${this.BITRIX24_DOMAIN}/rest/` });
    }

    public async callMethod(method: string, payload: Payload = {}): Promise<any> {
        try {
            const { queryParams, payload: parsedPayload } = await this.parsePayload(payload);
            const response = await this.client.post(`${method}.json`, parsedPayload, { params: queryParams });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    console.log("Renew token");
                    this.token = await this.auth.refreshToken();
                    const { queryParams, payload: parsedPayload } = await this.parsePayload(payload, this.token.access_token);
                    try {
                        const retryResponse = await this.client.post(`${method}.json`, parsedPayload, { params: queryParams });
                        return retryResponse.data;
                    } catch (retryError) {
                        console.error('Lỗi khi gọi lại API sau khi làm mới token:', retryError);
                        throw retryError;
                    }
                }
                console.error('Lỗi HTTP:', axiosError.response?.status, axiosError.message);
                throw axiosError;
            } else {
                console.error('Lỗi không xác định:', error);
                throw error;
            }
        }
    }

    private async parsePayload(payload: Payload, accessToken?: string) {
        const { params = {}, ID = null, ...rest } = payload;
        const token = accessToken || (await this.auth.getToken()).access_token;

        const queryParams: Record<string, string> = {
            auth: token,
            ...params,
        };

        if (ID) {
            queryParams['id'] = ID;
        }

        return { queryParams, payload: rest };
    }
}
