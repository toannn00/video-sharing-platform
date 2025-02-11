import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })
export class NotificationGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('newVideoNotification')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('newVideoNotification', message);
  }
}
