import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";
import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

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
      db: new PrismaClient(),
    };
  },
});

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
