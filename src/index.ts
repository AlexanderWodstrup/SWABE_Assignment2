import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";
import { ApolloServer } from "apollo-server";
import prisma from "./lib/prismaLib";

export const server = new ApolloServer({
  schema: makeSchema({
    types,
    outputs: {
      typegen: join(__dirname, "..", "nexus-typegen.ts"),
      schema: join(__dirname, "..", "schema.graphql"),
    },
    contextType: {
      module: join(__dirname, "context.ts"),
      export: "Context",
    },
  }),
  context() {
    return {
      db: prisma,
    };
  },
});

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
