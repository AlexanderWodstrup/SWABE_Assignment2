import {
  objectType,
  extendType,
  nonNull,
  intArg,
  floatArg,
  booleanArg,
  nullable,
  list,
} from "nexus";
import { Reservation } from "./Reservation";

export const Room = objectType({
  name: "Room",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("roomNumber");
    t.nonNull.int("numOfBeds");
    t.nonNull.float("pricePerNight");
    t.nonNull.boolean("oceanView");
    t.nonNull.boolean("minibar");
    t.nullable.list.field("reservation", { type: Reservation });
  },
});

export const RoomQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nullable.list.field("getRooms", {
      type: "Room",
      resolve: (source, args, context) => {
        return context.db.room.findMany();
      },
    });
    t.nullable.field("getRoom", {
      type: "Room",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (source, args, context) => {
        let room = context.db.room.findFirst({ where: { id: args.id } });

        if (!room) {
          throw new Error("Could not find room with id " + args.id);
        }

        return room;
      },
    });
  },
});

export const RoomMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nullable.field("createRoom", {
      type: "Room",
      args: {
        roomNumber: nonNull(intArg()),
        numOfBeds: nonNull(intArg()),
        pricePerNight: nonNull(floatArg()),
        oceanView: nonNull(booleanArg()),
        minibar: nonNull(booleanArg()),
      },
      async resolve(source, args, context) {
        const tempRoom = {
          roomNumber: args.roomNumber,
          numOfBeds: args.numOfBeds,
          pricePerNight: args.pricePerNight,
          oceanView: args.oceanView,
          minibar: args.minibar,
        };

        let roomExist = await context.db.room.findFirst({
          where: { roomNumber: args.roomNumber },
        });

        if (roomExist) {
          throw new Error("Room already exist");
        }

        return context.db.Room.create({ data: tempRoom });
      },
    });
    t.nonNull.field("updateRoom", {
      type: "Room",
      args: {
        id: nonNull(intArg()),
        roomNumber: nullable(intArg()),
        numOfBeds: nullable(intArg()),
        pricePerNight: nullable(floatArg()),
        oceanView: nullable(booleanArg()),
        minibar: nullable(booleanArg()),
      },
      async resolve(source, args, context) {
        const tempRoom = {
          roomNumber: args.roomNumber,
          numOfBeds: args.numOfBeds,
          pricePerNight: args.pricePerNight,
          oceanView: args.oceanView,
          minibar: args.minibar,
        };

        let roomExist = await context.db.room.findFirst({
          where: { id: args.id },
        });

        if (!roomExist) {
          throw new Error("Room not found. id: " + args.id);
        }

        return context.db.Room.update({
          where: { id: args.id },
          data: tempRoom,
        });
      },
    });
    t.nonNull.field("deleteRoom", {
      type: "Room",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(source, args, context) {
        let roomExist = await context.db.room.findFirst({
          where: { id: args.id },
        });

        if (!roomExist) {
          throw new Error("Room not found. id: " + args.id);
        }

        return context.db.room.delete({ where: { id: args.id } });
      },
    });
  },
});
