import { Router } from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import graphqlMiddleware from '../common/middlewares/graphql';
import rootSchema from '../common/schemas/rootSchema';

function createGraphqlRoutes(router) {
  router.use(graphqlMiddleware);

  router.use('/graphql', bodyParser.json(), graphqlExpress({ schema: rootSchema }));
  router.use('/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));

  return router;
}

function createRoutes() {
  const router = new Router();
  // createLegacyRoutes(router);
  createGraphqlRoutes(router);

  return router;
}

export default (app) => {
  app.use('/api', createRoutes());
};
