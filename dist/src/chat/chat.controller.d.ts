import { ChatService } from './chat.service';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    chatInit(res: any, req: any): Promise<any>;
}
