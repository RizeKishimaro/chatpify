import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9900, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() ws: Server;

  afterInit(server: Socket) {
    console.log(`server started `);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.ws.emit('clientConnect', client.id);
  }

  handleDisconnect(client: Socket) {
    this.ws.emit('clientDisconnect', client.id);
  }

  @SubscribeMessage('messageToServer')
  sendMessage(client: Socket, text: string): void {
    this.ws.emit('messageOnClient', text);
  }
}
