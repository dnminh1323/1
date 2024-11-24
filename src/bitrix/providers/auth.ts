import dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jsonfile from 'jsonfile';
import fs from 'fs';
import axios, { AxiosInstance } from 'axios';

interface Token {
  refresh_token: string;
  access_token: string;
}

@Injectable()
export class Auth {
    private APP_ID: string;
    private APP_SECRET: string;
    public BITRIX24_DOMAIN: string;
    private TOKEN_STORAGE_FILE = 'src/config/tokenStorage.json';
    private client: AxiosInstance;

    constructor(
        private configService: ConfigService,
    ) {
        this.APP_ID = this.configService.get<string>('APP_ID');
        this.APP_SECRET = this.configService.get<string>('APP_SECRET');
        this.BITRIX24_DOMAIN = this.configService.get<string>('BITRIX24_DOMAIN');
        this.client = axios.create({ baseURL: 'https://oauth.bitrix.info/oauth/token' });
    }

    // Tạo thư mục nếu không tồn tại
    private ensureDirectoryExistence(filePath: string): boolean {
        const dirname = filePath.substring(0, filePath.lastIndexOf('/'));
        if (fs.existsSync(dirname)) {
            return true;
        }
        fs.mkdirSync(dirname, { recursive: true });
        return false;
    }

    // Lấy token từ file
    public async getToken(): Promise<Token | null> {
        try {
            const data: Token = await jsonfile.readFile(this.TOKEN_STORAGE_FILE);
            return data;
        } catch (error: any) {
            console.error('Lỗi khi đọc tệp token:', error.message);
            throw error; 
        }
    }

    // Làm mới token
    public async refreshToken(): Promise<Token> {
        try {
            const token = await this.getToken(); // Lấy token hiện tại
            if (!token) {
                throw new Error('Không tìm thấy token');
            }
            
            const url = new URL(this.client.defaults.baseURL as string);
            url.searchParams.append('grant_type', 'refresh_token');
            url.searchParams.append('client_id', this.APP_ID);
            url.searchParams.append('client_secret', this.APP_SECRET);
            url.searchParams.append('refresh_token', token.refresh_token);

            // Sử dụng axios để gửi yêu cầu GET
            const response = await this.client.get(url.toString());

            // Kiểm tra nếu response không thành công
            if (response.status !== 200) {
                throw new Error(`Lấy access token thất bại: ${response.statusText}`);
            }

            const data: Token = response.data;
            
            // Đảm bảo thư mục đã tồn tại trước khi ghi tệp
            this.ensureDirectoryExistence(this.TOKEN_STORAGE_FILE);

            // Lưu lại token mới vào file
            await jsonfile.writeFile(this.TOKEN_STORAGE_FILE, { 
              refresh_token: data.refresh_token, 
              access_token: data.access_token 
            });

            return data;
        } catch (error: any) {
            console.error('Lỗi khi lấy access_token:', error.message);
            throw error; 
        }
    }
}
