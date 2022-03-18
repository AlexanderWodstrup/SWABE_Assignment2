import {
  objectType,
  extendType,
  nonNull,
  intArg,
  floatArg,
  booleanArg,
  nullable,
} from "nexus";

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
