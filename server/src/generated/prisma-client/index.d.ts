// Code generated by Prisma (prisma@1.27.3). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  song: (where?: SongWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  song: (where: SongWhereUniqueInput) => SongPromise;
  songs: (
    args?: {
      where?: SongWhereInput;
      orderBy?: SongOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Song>;
  songsConnection: (
    args?: {
      where?: SongWhereInput;
      orderBy?: SongOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => SongConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<User>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createSong: (data: SongCreateInput) => SongPromise;
  updateSong: (
    args: { data: SongUpdateInput; where: SongWhereUniqueInput }
  ) => SongPromise;
  updateManySongs: (
    args: { data: SongUpdateManyMutationInput; where?: SongWhereInput }
  ) => BatchPayloadPromise;
  upsertSong: (
    args: {
      where: SongWhereUniqueInput;
      create: SongCreateInput;
      update: SongUpdateInput;
    }
  ) => SongPromise;
  deleteSong: (where: SongWhereUniqueInput) => SongPromise;
  deleteManySongs: (where?: SongWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => UserPromise;
  updateManyUsers: (
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput }
  ) => BatchPayloadPromise;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  song: (
    where?: SongSubscriptionWhereInput
  ) => SongSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type SongOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "artist_ASC"
  | "artist_DESC"
  | "content_ASC"
  | "content_DESC"
  | "private_ASC"
  | "private_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpdateOneRequiredWithoutSongsInput {
  create?: UserCreateWithoutSongsInput;
  update?: UserUpdateWithoutSongsDataInput;
  upsert?: UserUpsertWithoutSongsInput;
  connect?: UserWhereUniqueInput;
}

export type SongWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface SongUpdateManyWithoutCreatedByInput {
  create?: SongCreateWithoutCreatedByInput[] | SongCreateWithoutCreatedByInput;
  delete?: SongWhereUniqueInput[] | SongWhereUniqueInput;
  connect?: SongWhereUniqueInput[] | SongWhereUniqueInput;
  set?: SongWhereUniqueInput[] | SongWhereUniqueInput;
  disconnect?: SongWhereUniqueInput[] | SongWhereUniqueInput;
  update?:
    | SongUpdateWithWhereUniqueWithoutCreatedByInput[]
    | SongUpdateWithWhereUniqueWithoutCreatedByInput;
  upsert?:
    | SongUpsertWithWhereUniqueWithoutCreatedByInput[]
    | SongUpsertWithWhereUniqueWithoutCreatedByInput;
  deleteMany?: SongScalarWhereInput[] | SongScalarWhereInput;
  updateMany?:
    | SongUpdateManyWithWhereNestedInput[]
    | SongUpdateManyWithWhereNestedInput;
}

export interface UserCreateInput {
  id: ID_Input;
  email: String;
  password: String;
  songs?: SongCreateManyWithoutCreatedByInput;
}

export interface UserUpdateInput {
  id?: ID_Input;
  email?: String;
  password?: String;
  songs?: SongUpdateManyWithoutCreatedByInput;
}

export interface UserUpsertWithoutSongsInput {
  update: UserUpdateWithoutSongsDataInput;
  create: UserCreateWithoutSongsInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface UserUpdateManyMutationInput {
  id?: ID_Input;
  email?: String;
  password?: String;
}

export interface SongCreateInput {
  id: ID_Input;
  name: String;
  artist?: String;
  content?: String;
  private?: Boolean;
  createdBy: UserCreateOneWithoutSongsInput;
}

export interface SongUpdateManyWithWhereNestedInput {
  where: SongScalarWhereInput;
  data: SongUpdateManyDataInput;
}

export interface UserCreateOneWithoutSongsInput {
  create?: UserCreateWithoutSongsInput;
  connect?: UserWhereUniqueInput;
}

export interface SongUpsertWithWhereUniqueWithoutCreatedByInput {
  where: SongWhereUniqueInput;
  update: SongUpdateWithoutCreatedByDataInput;
  create: SongCreateWithoutCreatedByInput;
}

export interface UserCreateWithoutSongsInput {
  id: ID_Input;
  email: String;
  password: String;
}

export interface SongUpdateWithoutCreatedByDataInput {
  id?: ID_Input;
  name?: String;
  artist?: String;
  content?: String;
  private?: Boolean;
}

export interface SongUpdateInput {
  id?: ID_Input;
  name?: String;
  artist?: String;
  content?: String;
  private?: Boolean;
  createdBy?: UserUpdateOneRequiredWithoutSongsInput;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  songs_some?: SongWhereInput;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  AND?: UserWhereInput[] | UserWhereInput;
}

export interface SongCreateWithoutCreatedByInput {
  id: ID_Input;
  name: String;
  artist?: String;
  content?: String;
  private?: Boolean;
}

export interface SongUpdateManyDataInput {
  id?: ID_Input;
  name?: String;
  artist?: String;
  content?: String;
  private?: Boolean;
}

export interface SongCreateManyWithoutCreatedByInput {
  create?: SongCreateWithoutCreatedByInput[] | SongCreateWithoutCreatedByInput;
  connect?: SongWhereUniqueInput[] | SongWhereUniqueInput;
}

export interface SongUpdateManyMutationInput {
  id?: ID_Input;
  name?: String;
  artist?: String;
  content?: String;
  private?: Boolean;
}

export interface SongWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  artist?: String;
  artist_not?: String;
  artist_in?: String[] | String;
  artist_not_in?: String[] | String;
  artist_lt?: String;
  artist_lte?: String;
  artist_gt?: String;
  artist_gte?: String;
  artist_contains?: String;
  artist_not_contains?: String;
  artist_starts_with?: String;
  artist_not_starts_with?: String;
  artist_ends_with?: String;
  artist_not_ends_with?: String;
  content?: String;
  content_not?: String;
  content_in?: String[] | String;
  content_not_in?: String[] | String;
  content_lt?: String;
  content_lte?: String;
  content_gt?: String;
  content_gte?: String;
  content_contains?: String;
  content_not_contains?: String;
  content_starts_with?: String;
  content_not_starts_with?: String;
  content_ends_with?: String;
  content_not_ends_with?: String;
  private?: Boolean;
  private_not?: Boolean;
  createdBy?: UserWhereInput;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  AND?: SongWhereInput[] | SongWhereInput;
}

export interface UserUpdateWithoutSongsDataInput {
  id?: ID_Input;
  email?: String;
  password?: String;
}

export interface SongScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  artist?: String;
  artist_not?: String;
  artist_in?: String[] | String;
  artist_not_in?: String[] | String;
  artist_lt?: String;
  artist_lte?: String;
  artist_gt?: String;
  artist_gte?: String;
  artist_contains?: String;
  artist_not_contains?: String;
  artist_starts_with?: String;
  artist_not_starts_with?: String;
  artist_ends_with?: String;
  artist_not_ends_with?: String;
  content?: String;
  content_not?: String;
  content_in?: String[] | String;
  content_not_in?: String[] | String;
  content_lt?: String;
  content_lte?: String;
  content_gt?: String;
  content_gte?: String;
  content_contains?: String;
  content_not_contains?: String;
  content_starts_with?: String;
  content_not_starts_with?: String;
  content_ends_with?: String;
  content_not_ends_with?: String;
  private?: Boolean;
  private_not?: Boolean;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  AND?: SongScalarWhereInput[] | SongScalarWhereInput;
  OR?: SongScalarWhereInput[] | SongScalarWhereInput;
  NOT?: SongScalarWhereInput[] | SongScalarWhereInput;
}

export interface SongSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: SongWhereInput;
  AND?: SongSubscriptionWhereInput[] | SongSubscriptionWhereInput;
}

export interface SongUpdateWithWhereUniqueWithoutCreatedByInput {
  where: SongWhereUniqueInput;
  data: SongUpdateWithoutCreatedByDataInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  email: String;
  password: String;
  createdAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  email: String;
  password: String;
  createdAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  songs: <T = FragmentableArray<Song>>(
    args?: {
      where?: SongWhereInput;
      orderBy?: SongOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  createdAt: () => Promise<DateTimeOutput>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  songs: <T = Promise<AsyncIterator<SongSubscription>>>(
    args?: {
      where?: SongWhereInput;
      orderBy?: SongOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface SongEdge {
  node: Song;
  cursor: String;
}

export interface SongEdgePromise extends Promise<SongEdge>, Fragmentable {
  node: <T = SongPromise>() => T;
  cursor: () => Promise<String>;
}

export interface SongEdgeSubscription
  extends Promise<AsyncIterator<SongEdge>>,
    Fragmentable {
  node: <T = SongSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface Song {
  id: ID_Output;
  name: String;
  artist: String;
  content: String;
  private: Boolean;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface SongPromise extends Promise<Song>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  artist: () => Promise<String>;
  content: () => Promise<String>;
  private: () => Promise<Boolean>;
  createdBy: <T = UserPromise>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface SongSubscription
  extends Promise<AsyncIterator<Song>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  artist: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  private: () => Promise<AsyncIterator<Boolean>>;
  createdBy: <T = UserSubscription>() => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface SongConnection {
  pageInfo: PageInfo;
  edges: SongEdge[];
}

export interface SongConnectionPromise
  extends Promise<SongConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<SongEdge>>() => T;
  aggregate: <T = AggregateSongPromise>() => T;
}

export interface SongConnectionSubscription
  extends Promise<AsyncIterator<SongConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<SongEdgeSubscription>>>() => T;
  aggregate: <T = AggregateSongSubscription>() => T;
}

export interface SongSubscriptionPayload {
  mutation: MutationType;
  node: Song;
  updatedFields: String[];
  previousValues: SongPreviousValues;
}

export interface SongSubscriptionPayloadPromise
  extends Promise<SongSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = SongPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = SongPreviousValuesPromise>() => T;
}

export interface SongSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<SongSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = SongSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = SongPreviousValuesSubscription>() => T;
}

export interface SongPreviousValues {
  id: ID_Output;
  name: String;
  artist: String;
  content: String;
  private: Boolean;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface SongPreviousValuesPromise
  extends Promise<SongPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  artist: () => Promise<String>;
  content: () => Promise<String>;
  private: () => Promise<Boolean>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface SongPreviousValuesSubscription
  extends Promise<AsyncIterator<SongPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  artist: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  private: () => Promise<AsyncIterator<Boolean>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateSong {
  count: Int;
}

export interface AggregateSongPromise
  extends Promise<AggregateSong>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateSongSubscription
  extends Promise<AsyncIterator<AggregateSong>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Song",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
