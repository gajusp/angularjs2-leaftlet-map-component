import 'dotenv/config';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLFormattedError } from 'graphql';

const PORT = Number(process.env.PORT || 4000);

// GraphQL type definitions and resolvers
const typeDefs = /* GraphQL */ `
  type Query {
    hello(name: String): String!
    health: String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: unknown, args: { name?: string }) => {
      const name = args.name?.trim() || 'World';
      return `Hello, ${name}!`;
    },
    health: () => 'ok',
  },
};

async function start() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({ schema, formatError });
  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }: { req: Request }) => ({
        authorization: req.headers['authorization'] || null,
      }),
    })
  );

  app.get('/healthz', (_req: Request, res: Response) => {
    res.status(200).send('ok');
  });

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
}

function formatError(formattedError: GraphQLFormattedError): GraphQLFormattedError {
  return formattedError;
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});