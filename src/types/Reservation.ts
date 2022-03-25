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
import { format, parse } from "date-fns";

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
      resolve: async (source, args, context) => {
        let reservations = await context.db.reservation.findMany();
        let formatResevations = reservations;

        formatResevations.map((reservation: any) =>
          formatResevation(reservation)
        );

        return formatResevations;
      },
    });
    t.nullable.field("getReservation", {
      type: "Reservation",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (source, args, context) => {
        let reservation = await context.db.reservation.findFirst({
          where: { id: args.id },
        });

        if (!reservation) {
          throw new Error("Could not find room with id " + args.id);
        }

        let formatedReservation = reservation;
        formatResevation(formatedReservation);

        return formatedReservation;
      },
    });
  },
});

export const ReservationMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nullable.field("createReservation", {
      type: "Reservation",
      args: {
        userId: nonNull(intArg()),
        roomId: nonNull(intArg()),
        dateFrom: nonNull(stringArg()),
        dateTo: nonNull(stringArg()),
      },
      async resolve(source, args, context) {
        const tempReservation = {
          dateFrom: parse(args.dateFrom, "dd/MM/yyyy", new Date()),
          dateTo: parse(args.dateTo, "dd/MM/yyyy", new Date()),
          roomId: args.roomId,
          userId: args.userId,
        };

        let reservation = await context.db.reservation.create({
          data: tempReservation,
        });

        context.db.room.update({
          where: {
            id: args.roomId,
          },
          data: {
            reservations: {
              connect: {
                id: reservation.id,
              },
            },
          },
        });

        context.db.user.update({
          where: {
            id: args.userId,
          },
          data: {
            reservations: {
              connect: {
                id: reservation.id,
              },
            },
          },
        });

        return formatResevation(reservation);
      },
    });
    t.nonNull.field("updateReservation", {
      type: "Reservation",
      args: {
        id: nonNull(intArg()),
        userId: nullable(intArg()),
        roomId: nullable(intArg()),
        dateFrom: nullable(stringArg()),
        dateTo: nullable(stringArg()),
      },
      async resolve(source, args, context) {
        const tempReservation = {
          dateFrom:
            args.dateFrom && parse(args.dateFrom, "dd/MM/yyyy", new Date()),
          dateTo: args.dateTo && parse(args.dateTo, "dd/MM/yyyy", new Date()),
          roomId: args.roomId,
          userId: args.userId,
        };

        let reservationExist = await context.db.reservation.findFirst({
          where: { id: args.id },
        });

        if (!reservationExist) {
          throw new Error("Reservation not found. id: " + args.id);
        }

        let reservation = await context.db.reservation.update({
          where: { id: args.id },
          data: tempReservation,
        });

        return formatResevation(reservation);
      },
    });
    t.nonNull.field("deleteReservation", {
      type: "Reservation",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(source, args, context) {
        let reservationExist = await context.db.reservation.findFirst({
          where: { id: args.id },
        });

        if (!reservationExist) {
          throw new Error("Reservation not found. id: " + args.id);
        }

        let deletedReservation = await context.db.reservation.delete({
          where: { id: args.id },
        });

        return formatResevation(deletedReservation);
      },
    });
  },
});

export function formatResevation(resevation: any) {
  console.log(resevation);
  resevation.dateFrom = format(resevation.dateFrom, "dd/MM/yyyy");
  resevation.dateTo = format(resevation.dateTo, "dd/MM/yyyy");

  return resevation;
}
