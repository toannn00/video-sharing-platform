import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

interface VideoNotification {
  title: string;
  email: string;
}

@WebSocketGateway({ cors: '*' })
export class NotificationGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('newVideoNotification')
  handleMessage(@MessageBody() notification: VideoNotification): void {
    this.server.emit('newVideoNotification', notification);
  }
}
