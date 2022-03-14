import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  list,
  idArg,
  intArg,
} from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("email");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("getUsers", {
      type: "User",
      resolve: (source, args, context) => {
        return context.db.user.findMany({ take: 10 });
      },
    });
    t.field("getUser", {
      type: "User",
      args: {
        userId: nonNull(intArg()),
      },
      resolve: (source, args, context) => {
        let user = context.db.user.findFirst({ where: { id: args.userId } });

        if (!user) {
          throw new Error("Could not find user with id " + args.userId);
        }

        return user;
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const tempUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        };

        return ctx.db.user.create({ data: tempUser });
      },
    });
  },
});
