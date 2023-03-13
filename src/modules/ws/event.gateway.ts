import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(2999, {
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @SubscribeMessage('connection')
  handleConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      username: string;
    },
  ): WsResponse<unknown> {
    client.emit('join', async (client) => {
      client.join(data.username);
    });
    return { event: 'connection', data: '服务端推送到客户端' };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody()
    data: {
      to: string;
    },
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    console.log(data.to);

    client.broadcast.emit('showMessage');
    client.emit('showMessage');
    return;
  }
}
