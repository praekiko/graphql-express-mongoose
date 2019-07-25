import { mergeSchemas } from 'graphql-tools';

import AlbumSchema from '../../modules/album/schema';

export default mergeSchemas({
	schemas: [AlbumSchema],
});
