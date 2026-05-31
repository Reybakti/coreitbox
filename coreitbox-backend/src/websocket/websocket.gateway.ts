import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import {
  Server,
  Socket,
} from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(
    client: Socket,
  ) {
    console.log(
      `Client Connected: ${client.id}`,
    );

    client.onAny(
      (event, ...args) => {
        console.log(
          'EVENT =>',
          event,
        );

        console.log(
          'ARGS =>',
          args,
        );
      },
    );
  }

  handleDisconnect(
    client: Socket,
  ) {
    console.log(
      `Client Disconnected: ${client.id}`,
    );
  }

  @SubscribeMessage('join-user')
  joinUser(
    @MessageBody()
    userId: string,

    @ConnectedSocket()
    client: Socket,
  ) {
    console.log(
      '================',
    );

    console.log(
      'JOIN ROOM =>',
      userId,
    );

    console.log(
      'CLIENT =>',
      client.id,
    );

    console.log(
      '================',
    );

    client.join(userId);

    client.emit(
      'notification',
      {
        title:
          'Realtime Connected',
        message:
          'Join room success',
      },
    );

    return {
      success: true,
      room: userId,
    };
  }

  emitNotification(
    userId: string,
    payload: any,
  ) {
    console.log(
      'EMIT NOTIFICATION =>',
      userId,
    );

    this.server
      .to(userId)
      .emit(
        'notification',
        payload,
      );
  }

  emitTicketUpdate(
    ticketId: string,
    payload: any,
  ) {
    this.server.emit(
      'ticket-updated',
      {
        ticketId,
        ...payload,
      },
    );
  }
}