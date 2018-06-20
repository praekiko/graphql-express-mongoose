const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// mongoose.connect('mongodb://localhost/test');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;

// const Cat = mongoose.model('Cat', { name: String });

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

// The resolvers
const resolvers = {
  Query: {
    allCats: async (parent, args, { Cat }) => {
      const cats = await Cat.find();
      return cats.map((cat) => {
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

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Cat } }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
