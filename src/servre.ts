import http from 'http';
import express from 'express';
import './config/logging.js';
import { loggingHandler } from './middleware/loggingHandler.js';
import { corsHandler } from './middleware/corsHandler.js';
import type { Request, Response, NextFunction } from 'express';
import { routeNotFound } from './middleware/routeNotFound.js';
import { SERVER, SERVER_HOST, SERVER_PORT } from './config/config.js';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
  logging.info('--------------------------------------------------');
  logging.info('Initializing api');
  logging.info('--------------------------------------------------');

  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.info('--------------------------------------------------');
  logging.info('Logging and configuration');
  logging.info('--------------------------------------------------');

  application.use(loggingHandler);
  application.use(corsHandler);

  logging.info('--------------------------------------------------');
  logging.info('Controllers and Routing');
  logging.info('--------------------------------------------------');

  application.get('/main/healthcheck', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      message: 'Hello, World!.'
    });
  });

  application.use(routeNotFound);

  httpServer = http.createServer(application);
  httpServer.listen(SERVER.SERVER_PORT, () => {
    logging.info('--------------------------------------------------');
    logging.info(`server running at -> http://${SERVER_HOST}:${SERVER_PORT}/`);
    logging.info('--------------------------------------------------');
  });
};

export const ShutDown = (callback: any) => httpServer && httpServer.close(callback);

Main();
