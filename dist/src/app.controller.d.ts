import { HttpException } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    streamMusic(url: string, res: any): Promise<HttpException>;
    getMusic(res: any): Promise<any>;
}
