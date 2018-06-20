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

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// Some fake data
// const books = [
//   {
//     title: "Harry Potter and the Sorcerer's stone",
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// // The GraphQL schema in string form
// const typeDefs = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;

// // The resolvers
// const resolvers = {
// 	Query: { books: () => books },
// 	Mutation:
// };

// The GraphQL schema in string form
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
