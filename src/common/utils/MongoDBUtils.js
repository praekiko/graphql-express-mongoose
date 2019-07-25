import mongoose from 'mongoose';

import config from '../config';

class MongoDB {
	async connect() {
		const { host, port, username, password, database, qs } = config.mongodb;

		const mongoDbUri = `mongodb://${username}:${password}@${host}:${port}/${database}${qs}`;

		await mongoose.connect(mongoDbUri);
		const { connection } = mongoose;
		connection.on('error', console.error.bind(console, 'connection error:'));
		// connection.once('open', () => db.db);

		return connection.db;
	}
}

export default new MongoDB();
