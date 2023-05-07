import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CryptoService } from 'src/security/aes-hasher.help';
import { JWTExtractor } from 'src/security/jwtExtractor.help';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    private chatService;
    private cryptoService;
    private jwtExtractor;
    constructor(chatService: ChatService, cryptoService: CryptoService, jwtExtractor: JWTExtractor);
    ws: Server;
    afterInit(server: Socket): void;
    handleConnection(req: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    sendMessage(client: any, { message, to }: {
        message: any;
        to: any;
    }): void;
}
