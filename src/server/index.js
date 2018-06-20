import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import Database from '../common/database';
import MongoDBUtils from '../common/utils/MongoDBUtils';

import healthCheck from './healthCheck';
import apiRouters from './apiRouters';

async function initServer(app) {
  try {
    const database = await MongoDBUtils.connect();
    Database.setDb(database);

    console.log(Database.getDb()
      .collection('albums')
      .find({}));

    app.use(morgan('dev'));
    app.use(cors());
  } catch (err) {
    throw new Error(err);
  }
}

const app = express();

initServer(app);
healthCheck(app);
apiRouters(app);

export default app;
