import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  list,
  idArg,
  intArg,
  enumType,
  arg,
} from "nexus";

export const Role = enumType({
  name: "role",
  members: {
    MANAGER: "MANAGER",
    CLERK: "CLERK",
    GUEST: "GUEST",
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("email");
    t.nonNull.field("role", { type: Role });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("getUsers", {
      type: "User",
      resolve: (source, args, context) => {
        return context.db.user.findMany();
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
        role: nonNull(Role),
      },
      resolve(_root, args, context) {
        const tempUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
        };

        return context.db.user.create({ data: tempUser });
      },
    });
    t.nonNull.field("updateUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        role: nonNull(Role),
      },
      resolve(source, args, context) {
        const updateUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
        };
        return context.db.user.update({
          where: { id: args.id },
          data: updateUser,
        });
      },
    });
    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve(source, args, context) {
        return context.db.User.delete({ where: { id: args.id } });
      },
    });
  },
});
