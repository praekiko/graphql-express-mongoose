import Raven from 'raven';
import { graphql } from 'graphql';
import PrettyError from 'pretty-error';
import rootSchema from '../schemas/rootSchema';

const pe = new PrettyError();

function reportError(error) {
  if (error.originalError) {
    console.error(pe.render(error));
    Raven.captureException(error, {
      tags: { graphql: 'exec_error' },
      extra: {
        source: error.source && error.source.body,
        positions: error.positions,
        path: error.path,
      },
    });
  } else {
    console.error(pe.render(error));
    Raven.captureMessage(`GraphQLWrongQuery: ${error.message}`, {
      tags: { graphql: 'wrong_query' },
      extra: {
        source: error.source && error.source.body,
        positions: error.positions,
      },
    });
  }
}

export default function (req, res, next) {
  res.gql = {
    query: async (q) => {
      const { query, variables } = q(req.params, req.query);
      const result = await graphql(rootSchema, query, null, req, variables);
      if (result.errors) {
        result.errors.forEach(reportError);
        result.errors.forEach((error) => {
          throw error;
        });
      }

      return result;
    },
  };
  next();
}
