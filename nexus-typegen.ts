/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  role: "CLERK" | "GUEST" | "MANAGER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  Reservation: { // root type
    dateFrom: string; // String!
    dateTo: string; // String!
    id: number; // Int!
    roomId: number; // Int!
    userId: number; // Int!
  }
  Room: { // root type
    id: number; // Int!
    minibar: boolean; // Boolean!
    numOfBeds: number; // Int!
    oceanView: boolean; // Boolean!
    pricePerNight: number; // Float!
    reservations?: Array<NexusGenRootTypes['Reservation'] | null> | null; // [Reservation]
    roomNumber: number; // Int!
  }
  User: { // root type
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    reservations?: Array<NexusGenRootTypes['Reservation'] | null> | null; // [Reservation]
    role: NexusGenEnums['role']; // role!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createReservation: NexusGenRootTypes['Reservation'] | null; // Reservation
    createRoom: NexusGenRootTypes['Room'] | null; // Room
    createUser: NexusGenRootTypes['User']; // User!
    deleteRoom: NexusGenRootTypes['Room']; // Room!
    deleteUser: NexusGenRootTypes['User']; // User!
    updateRoom: NexusGenRootTypes['Room']; // Room!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    getReservation: NexusGenRootTypes['Reservation'] | null; // Reservation
    getReservations: Array<NexusGenRootTypes['Reservation'] | null> | null; // [Reservation]
    getRoom: NexusGenRootTypes['Room'] | null; // Room
    getRooms: Array<NexusGenRootTypes['Room'] | null> | null; // [Room]
    getUser: NexusGenRootTypes['User'] | null; // User
    getUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Reservation: { // field return type
    dateFrom: string; // String!
    dateTo: string; // String!
    id: number; // Int!
    roomId: number; // Int!
    userId: number; // Int!
  }
  Room: { // field return type
    id: number; // Int!
    minibar: boolean; // Boolean!
    numOfBeds: number; // Int!
    oceanView: boolean; // Boolean!
    pricePerNight: number; // Float!
    reservations: Array<NexusGenRootTypes['Reservation'] | null> | null; // [Reservation]
    roomNumber: number; // Int!
  }
  User: { // field return type
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    reservations: Array<NexusGenRootTypes['Reservation'] | null> | null; // [Reservation]
    role: NexusGenEnums['role']; // role!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createReservation: 'Reservation'
    createRoom: 'Room'
    createUser: 'User'
    deleteRoom: 'Room'
    deleteUser: 'User'
    updateRoom: 'Room'
    updateUser: 'User'
  }
  Query: { // field return type name
    getReservation: 'Reservation'
    getReservations: 'Reservation'
    getRoom: 'Room'
    getRooms: 'Room'
    getUser: 'User'
    getUsers: 'User'
  }
  Reservation: { // field return type name
    dateFrom: 'String'
    dateTo: 'String'
    id: 'Int'
    roomId: 'Int'
    userId: 'Int'
  }
  Room: { // field return type name
    id: 'Int'
    minibar: 'Boolean'
    numOfBeds: 'Int'
    oceanView: 'Boolean'
    pricePerNight: 'Float'
    reservations: 'Reservation'
    roomNumber: 'Int'
  }
  User: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    reservations: 'Reservation'
    role: 'role'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createReservation: { // args
      dateFrom: string; // String!
      dateTo: string; // String!
      roomId: number; // Int!
      userId: number; // Int!
    }
    createRoom: { // args
      minibar: boolean; // Boolean!
      numOfBeds: number; // Int!
      oceanView: boolean; // Boolean!
      pricePerNight: number; // Float!
      roomNumber: number; // Int!
    }
    createUser: { // args
      email: string; // String!
      firstName: string; // String!
      lastName: string; // String!
      role: NexusGenEnums['role']; // role!
    }
    deleteRoom: { // args
      id: number; // Int!
    }
    deleteUser: { // args
      id: number; // Int!
    }
    updateRoom: { // args
      id: number; // Int!
      minibar?: boolean | null; // Boolean
      numOfBeds?: number | null; // Int
      oceanView?: boolean | null; // Boolean
      pricePerNight?: number | null; // Float
      roomNumber?: number | null; // Int
    }
    updateUser: { // args
      email?: string | null; // String
      firstName?: string | null; // String
      id: number; // Int!
      lastName?: string | null; // String
      role?: NexusGenEnums['role'] | null; // role
    }
  }
  Query: {
    getReservation: { // args
      id: number; // Int!
    }
    getRoom: { // args
      id: number; // Int!
    }
    getUser: { // args
      userId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}