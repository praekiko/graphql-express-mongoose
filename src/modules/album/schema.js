import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
	typeDefs,
	resolvers,
});
