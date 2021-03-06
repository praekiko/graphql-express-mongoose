import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
type Cat {
  _id: String!,
  name: String!
}

type Query {
  allCats: [Cat!]!
}

type Mutation {
  createCat(name: String!): Cat!
}
`;

const resolvers = {
	Query: {
		allCats: async (parent, args, { Cat }) => {
			const cats = await Cat.find();
			return cats.map(cat => {
				cat._id = cat._id.toString();
				return cat;
			});
		},
	},
	Mutation: {
		createCat: async (parent, args, { Cat }) => {
			const cat = await new Cat(args).save();
			cat._id = cat._id.toString();
			return cat;
		},
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
