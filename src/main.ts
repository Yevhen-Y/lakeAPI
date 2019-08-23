import { app } from './app'
import * as http from 'http';
import { MongoHelper } from './mongo.helper';
import * as mongoose from 'mongoose';
import { SocketConnection } from './socket-connection';

const PORT = 8081;
const MONGO_URI = 'mongodb://localhost:27017/lakedb';
const server = http.createServer(app);

  
server.listen(PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${PORT}`)
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection.on('open', () => {
        console.info('Connected to Mongo.');
    });
    mongoose.connection.on('error', (err:any) => {
        console.error(err);
    } )
});

SocketConnection.Server = server;

