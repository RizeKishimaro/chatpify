import { OnModuleInit, Req, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtGuard } from 'src/user/guards/jwt/jwt.guard';
import { ChatService } from './chat.service';
import { ChatGuard } from './guards/chat.guard';
import { CryptoService } from 'src/security/aes-hasher.help';
import { JWTExtractor } from 'src/security/jwtExtractor.help';

@WebSocketGateway(9900, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private chatService: ChatService,
    private cryptoService: CryptoService,
    private jwtExtractor: JWTExtractor,
  ) {}
  @WebSocketServer() ws: Server;

  afterInit(server: Socket) {
    console.log(`server started `);
  }
  async handleConnection(req: any, ...args: any[]) {
    // const name = this.chatService.find();
    const userToken = req.handshake.headers.auth;
    const userParamToken = req;
    if (!userToken) {
      this.ws.emit('login_failed', { message: 'Please login!' });
      return;
    }
    const token = this.cryptoService.decrypt(userToken);
    const payload = await this.jwtExtractor.checkJwt(token);
    const username = this.jwtExtractor.decrypt(payload.ll2zBSe2ee2uE2);
    const userId = payload.userid;
    req.user = { username, userId };
    this.ws.emit('clientConnect', { username: username, id: req.id });
  }
  @UseGuards(ChatGuard)
  handleDisconnect(client: any) {
    const username = client.user.username;
    const id = client.id;
    this.ws.emit('clientDisconnect', { username, id });
  }

  @UseGuards(ChatGuard)
  @SubscribeMessage('messageToServer')
  sendMessage(client: any, { message, to }): void {
    console.log(client.rooms);
    const name = client.user.username;
    client
      .to(to)
      .to(client.id)
      .emit('newPrivateMessage', { sender: name, message: message });
  }
  // @SubscribeMessage('join')
  // createRoom(client: any, data: any) {
  //   const name = client.user.username;
  //   const id = client.user.userId;
  //   console.log(client.user);
  //   const roomName = `${id}`;
  //   client.join(roomName);
  //   console.log(`${client.user.username} joined room ${roomName}`);
  //   console.log(client.rooms);
  // }
}
