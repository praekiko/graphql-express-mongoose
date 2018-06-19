const axios = require("axios");

const {
  GraphQLObjectType, //case sensitive
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// Hardcode
// const customers = [
//   { id: "1", name: "Prae", email: "prae@gmail.com", age: 23 },
//   { id: "2", name: "Ploy", email: "ploy@gmail.com", age: 31 },
//   { id: "3", name: "Ball", email: "ball@gmail.com", age: 33 }
// ];

//  Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", //must have name
  fields: {
    customer: {
      type: CustomerType,
      //for query or fetch
      // like get customer by id
      args: {
        id: { type: GraphQLString }
      },
      // for return

      resolve(parentValue, args) {
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id === args.id) {
        //     return customers[i];
        //   }
        // }
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      // dont need args -> wee get all
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/customers/`)
          .then(res => res.data);
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios
          .post(`http://localhost:3000/customers/`, {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/customers/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  // root query -> baseline for all of query
  query: RootQuery,
  mutation
});