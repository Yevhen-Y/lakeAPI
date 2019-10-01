import { SocketConnection } from "./socket-connection";

export class RabbitMQ {

    public receiveQueue() {

        const amqp = require('amqplib/callback_api');
        amqp.connect('amqp://134.132.239.57:5672', (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                let queue = 'lake';

                channel.assertQueue(queue, {
                    durable: false
                });

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                channel.consume(queue, function (msg: any) {
                    console.log(queue, msg.content.toString());
                    SocketConnection.getSocket().socket.emit('datafish', msg.content.toString());

                }, {
                    noAck: true
                });

            });

        });

    }
}
