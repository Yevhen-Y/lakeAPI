
import * as socketIO from 'socket.io';
import * as http from 'http';

export class SocketConnection {

  private static instance: SocketConnection;
  socket: socketIO.Server;


  public static Server: http.Server;

  public static getSocket() {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
      SocketConnection.instance.socket = socketIO(SocketConnection.Server, {
        path: '/socket.io'
      });
      SocketConnection.instance.socket.origins('*:*');
      SocketConnection.instance.socket.on('connection', socket => {
        console.log('connected socker from API');
      });

    }
    return SocketConnection.instance;


  }

}