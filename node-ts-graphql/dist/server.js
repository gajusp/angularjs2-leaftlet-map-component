"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const schema_1 = require("@graphql-tools/schema");
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
        hello: (_, args) => {
            const name = args.name?.trim() || 'World';
            return `Hello, ${name}!`;
        },
        health: () => 'ok',
    },
};
async function start() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(body_parser_1.default.json());
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
    const apolloServer = new server_1.ApolloServer({ schema, formatError });
    await apolloServer.start();
    app.use('/graphql', (0, express4_1.expressMiddleware)(apolloServer, {
        context: async ({ req }) => ({
            authorization: req.headers['authorization'] || null,
        }),
    }));
    app.get('/healthz', (_req, res) => {
        res.status(200).send('ok');
    });
    const httpServer = http_1.default.createServer(app);
    httpServer.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`GraphQL server ready at http://localhost:${PORT}/graphql`);
    });
}
function formatError(formattedError) {
    return formattedError;
}
start().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map