import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTExtractor } from 'src/security/jwtExtractor.help';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private JWTExtractor: JWTExtractor) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const logger = new Logger(ChatGuard.name);
    const client = context.switchToWs().getClient();
    console.log(client.handshake);
    const authKey = client.handshake.headers.auth;
    if (!authKey) {
      return false;
    }
    const token = this.JWTExtractor.decrypt(authKey);
    const result = await this.JWTExtractor.checkJwt(token);
    let authnicated;
    result.islogged ? (authnicated = true) : (authnicated = false);
    // If the client is authenticated, allow access to the WebSocket endpoint
    return authnicated;
  }
}
