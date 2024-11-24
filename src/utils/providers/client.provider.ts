import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface HttpClientConfig {
    baseURL: string;
}

@Injectable()
export class ClientProvider {
    // private client: AxiosInstance;

    // constructor(config: HttpClientConfig) {
    //   this.client = axios.create({
    //     baseURL: config.baseURL,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // }
  
    // // Phương thức GET
    // get(url: string, config?: AxiosRequestConfig) {
    //   return this.client.get(url, config);
    // }
  
    // // Phương thức POST
    // post(url: string, data: any, config?: AxiosRequestConfig) {
    //   return this.client.post(url, data, config);
    // }
}
