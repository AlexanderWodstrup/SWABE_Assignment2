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
  nullable,
} from "nexus";
import { formatResevation, Reservation } from "./Reservation";

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
    t.nullable.list.field("reservations", { type: Reservation });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nullable.list.field("getUsers", {
      type: "User",
      resolve: async (source, args, context) => {
        let users = await context.db.user.findMany({
          include: { reservations: true },
        });

        let formatUser = users;
        formatUser.map((user: any) =>
          user.reservations.map((reservation: any) =>
            formatResevation(reservation)
          )
        );

        return formatUser;
      },
    });
    t.nullable.field("getUser", {
      type: "User",
      args: {
        userId: nonNull(intArg()),
      },
      resolve: async (source, args, context) => {
        let user = await context.db.user.findFirst({
          where: { id: args.userId },
          include: { reservations: true },
        });

        if (!user) {
          throw new Error("Could not find user with id " + args.userId);
        }

        let formatUser = user;

        formatUser.reservations.map((reservation: any) =>
          formatResevation(reservation)
        );

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
      async resolve(_root, args, context) {
        const tempUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
        };

        let userExist = await context.db.user.findFirst({
          where: { email: args.email },
        });

        if (userExist) {
          throw new Error("User already exist");
        } else {
          return context.db.user.create({ data: tempUser });
        }
      },
    });

    t.nonNull.field("updateUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
        firstName: nullable(stringArg()),
        lastName: nullable(stringArg()),
        email: nullable(stringArg()),
        role: nullable(Role),
      },
      async resolve(source, args, context) {
        const updateUser = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
        };
        let userExist = await context.db.user.findFirst({
          where: { id: args.id },
        });

        if (!userExist) {
          throw new Error("User not found. id: " + args.id);
        }

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
      async resolve(source, args, context) {
        let userExist = await context.db.user.findFirst({
          where: { id: args.id },
        });

        if (!userExist) {
          throw new Error("User not found. id: " + args.id);
        }

        return context.db.User.delete({ where: { id: args.id } });
      },
    });
  },
});
