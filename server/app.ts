import Koa from "koa";
import Router from "koa-router";
import KoaStatic from "koa-static";
import bodyParser from "koa-bodyparser";
import chalk from "chalk";
import mount from "koa-mount";
import graphqlHTTP from "koa-graphql";
import connect from "../model/connect";
import Schema from "../graphql";
import crud from "../router/crud";
import { ApolloServer, gql } from "apollo-server-koa";

import RootSchema, { RootQuery, Mutation } from "../graphql";

connect();

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

app.use(bodyParser());

// router.get("/", (ctx, next) => {
//   ctx.body =
//     "Hello! This A App Based On GraphQL & Koa & Mongoose. But for now it's just a demo~";
// });

// crud(app);

app.use(KoaStatic("./public"));
app.use(router.routes()).use(router.allowedMethods());

// app.use(
//   mount(
//     "/demo",
//     graphqlHTTP({
//       schema: Schema,
//       graphiql: true
//     })
//   )
// );

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({  });
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(chalk.green(`Server Start on http://localhost:${port}`));
});
