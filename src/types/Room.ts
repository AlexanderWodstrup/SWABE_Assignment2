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
  floatArg,
  booleanArg,
  nullable,
} from "nexus";

export const Room = objectType({
  name: "Room",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("roomNumber");
    t.nonNull.int("numOfBeds");
    t.nonNull.float("pricePerNight");
    t.nonNull.boolean("oceanView");
    t.nonNull.boolean("miniBar");
  },
});

export const RoomMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRoom", {
      type: "Room",
      args: {
        roomNumber: nonNull(intArg()),
        numOfBeds: nonNull(intArg()),
        pricePerNight: nonNull(floatArg()),
        oceanView: nonNull(booleanArg()),
        minibar: nonNull(booleanArg()),
      },
      resolve(source, args, context) {
        const tempRoom = {
          roomNumber: args.roomNumber,
          numOfBeds: args.numOfBeds,
          pricePerNight: args.pricePerNight,
          oceanView: args.oceanView,
          minibar: args.minibar,
        };

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
      resolve(source, args, context) {
        const tempRoom = {
          roomNumber: args.roomNumber,
          numOfBeds: args.numOfBeds,
          pricePerNight: args.pricePerNight,
          oceanView: args.oceanView,
          minibar: args.minibar,
        };

        return context.db.Room.update({
          where: { id: args.id },
          data: tempRoom,
        });
      },
    });
  },
});
