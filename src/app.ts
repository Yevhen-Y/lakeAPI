import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './request.logger.middleware';
import './lake.controller';

import { RegisterRoutes} from './routes';
import * as swaggerUi from 'swagger-ui-express';
import { RabbitMQ } from './rabbit-receive';



const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

app.use(new RabbitMQ().receiveQueue)


try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
    console.error('Unable to read swagger.json', err);
}


export { app }