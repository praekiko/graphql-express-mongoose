const schema = `
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

export default schema;
