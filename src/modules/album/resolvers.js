import { Types } from 'mongoose';

import Database from '../../common/database';

export default {
	Query: {
		album: async (_, query, req) => {
			const { id } = query;
			const album = await Database.getDB()
				.collection('albums')
				.findOne({
					_id: new Types.ObjectId(id),
				});

			return album;
		},
		albums: async (_, query) => {
			const albums = await Database.getDB()
				.collection('albums')
				.find({})
				.toArray();

			return albums.map(album => {
				album._id = album._id.toString();
				return album;
			});
		},
	},
};
