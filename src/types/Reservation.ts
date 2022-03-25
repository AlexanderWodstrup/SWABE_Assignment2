import {
  objectType,
  extendType,
  nonNull,
  intArg,
  floatArg,
  booleanArg,
  nullable,
  stringArg,
} from "nexus";
import { parse } from "date-fns";

export const Reservation = objectType({
  name: "Reservation",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("userId");
    t.nonNull.int("roomId");
    t.nonNull.string("dateFrom");
    t.nonNull.string("dateTo");
  },
});

export const ReservationQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nullable.list.field("getReservations", {
      type: "Reservation",
      resolve: (source, args, context) => {
        return context.db.reservation.findMany();
      },
    });
    t.nullable.field("getReservation", {
      type: "Reservation",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (source, args, context) => {
        let reservation = context.db.reservation.findFirst({
          where: { id: args.id },
        });

        if (!reservation) {
          throw new Error("Could not find room with id " + args.id);
        }

        return reservation;
      },
    });
  },
});

export const ReservationMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createResevation", {
      type: "Reservation",
      args: {
        userId: nonNull(intArg()),
        roomId: nonNull(intArg()),
        dateFrom: nonNull(stringArg()),
        dateTo: nonNull(stringArg()),
      },
      async resolve(source, args, context) {
        const tempResevation = {
          dateFrom: parse(args.dateFrom, "dd/MM/yyyy", new Date()),
          dateTo: parse(args.dateTo, "dd/MM/yyyy", new Date()),
          roomId: args.roomId,
          userId: args.userId,
        };

        console.log(tempResevation);

        let reservation = context.db.reservation.create({
          data: tempResevation,
        });

        context.db.reservation.update({
          where: {
            id: args.roomId,
          },
          data: {
            Reservation: {
              connect: {
                id: reservation.id,
              },
            },
          },
        });

        return reservation;
      },
    });
  },
});
