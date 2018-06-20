import * as MongoClient from 'mongodb';
import mongoose from 'mongoose';

import config from '../config';

class MongoDB {
  async connect() {
    const {
      host, port, username, password, database, qs,
    } = config.mongodb;

    const mongoDbUri = `mongodb://${username}:${password}@${host}:${port}/${database}${qs}`;

    await mongoose.connect(mongoDbUri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', () => db.db);

    return db.db;
  }
}

export default new MongoDB();
