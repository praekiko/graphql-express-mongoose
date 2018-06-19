# Start

npm init

# Init

npm i express express-graphql nodemon --save

# Setup server.js

# Go to package.json file

"dev:server": "nodemon server.js"

http://localhost:4000/

Cannot GET / -> we dont have route

# create entry point for graphql

const expressGraphQL = require('express-graphql')
app.use('/graphql', expressGraphQL({
schema: schema,
graphiql: true
}) )

# create schema.js

const {
GraphQLObjectType, //case sensitive
GraphQLString,
GraphQLInt,
GraphQLSchema,
GraphQLList,
GraphQLNonNull
} = require("graphql");

# add in server.js

const schema = require('./schema.js')

# install graphql

npm i graphql --save

# create Root Query

const RootQuery = new GraphQLObjectType({
name: "RootQueryType", //must have name
fields: {
customer: {
type: CustomerType,
args: {
//for fetch
id: { type: GraphQLString }
},
resolve(parentValue, args) {
// for return
for (let i = 0; i < customers.length; i++) {
if (customers[i] === args.id) {
return customers[i];
}
}
}
}
}
});

# export Schema

module.exports = new GraphQLSchema({
// root query -> baseline for all of query
query: RootQuery
});

# Go to graphiql

http://localhost:4000/graphql

# Write Query

{
customer(id: "1"){
name, email, age
}
}

# and CTRL + Enter to see result

# ad customers feild

customers: {
type: new GraphQLList(CustomerType),
// dont need args -> wee get all
resolve(parentValue, args) {
return customers;
}
}

# query

{
customers {
id,
name
}
}

# add json-server

npm i json-server axios

"json:server": "json-server --watch data.json"

# add customer -> by mutation

const mutaion = new GraphQLObjectType({
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
}
}
});

# add to schema

# query

mutation {
addCustomer(name: "Tee", email: "tee@gmail.com", age: 61) {
id
name
email // these what we wnat back
}
}

# delete

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
}

# query

mutation {
deleteCustomer(id: "3") {
id
}
}

# update customer

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

# query

mutation {
updateCustomer(id: "2", age: 50) {
id
name
}
}
