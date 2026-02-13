import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { User as PrismaUser, GamePlayer as PrismaGamePlayer, Grid as PrismaGrid, Square as PrismaSquare, Notification as PrismaNotification } from '../generated/prisma/client';
import type { GraphQLContext } from './context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
};

export type BulkAddPlayersInput = {
  gridId: Scalars['ID']['input'];
  players: Array<PlayerInput>;
};

export type BulkAssignSquaresInput = {
  gamePlayerId: Scalars['ID']['input'];
  squareIds: Array<Scalars['ID']['input']>;
};

export type CreateGridInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateNotificationInput = {
  actionType: NotificationAction;
  description: Scalars['String']['input'];
  gridId?: InputMaybe<Scalars['String']['input']>;
  iconType: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  title: Scalars['String']['input'];
  triggeredByUserId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebaseUserId?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type GamePlayer = {
  __typename?: 'GamePlayer';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  gridId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  joinedAt: Scalars['DateTime']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type Grid = {
  __typename?: 'Grid';
  columnOrder: Array<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owners: Array<User>;
  players: Array<GamePlayer>;
  rowOrder: Array<Scalars['Int']['output']>;
  squares: Array<Square>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkAddPlayers?: Maybe<Grid>;
  bulkAssignSquares: Array<Square>;
  createGrid: Grid;
  createNotification: Notification;
  createUser: User;
  deleteGrid: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  updateGrid?: Maybe<Grid>;
  updateSquare?: Maybe<Square>;
  updateUser?: Maybe<User>;
};


export type MutationbulkAddPlayersArgs = {
  input: BulkAddPlayersInput;
};


export type MutationbulkAssignSquaresArgs = {
  input: BulkAssignSquaresInput;
};


export type MutationcreateGridArgs = {
  input: CreateGridInput;
};


export type MutationcreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationdeleteGridArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationupdateGridArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGridInput;
};


export type MutationupdateSquareArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSquareInput;
};


export type MutationupdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  actionType: NotificationAction;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  gridId?: Maybe<Scalars['String']['output']>;
  iconType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  triggeredByUserId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type NotificationAction =
  | 'GAME_COMPLETED'
  | 'GAME_INVITE'
  | 'GAME_STARTED'
  | 'GENERAL'
  | 'GRID_ASSIGNED'
  | 'PLAYER_JOINED'
  | 'SQUARE_CLAIMED';

export type PlayerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  dbStatus: Scalars['String']['output'];
  grid?: Maybe<Grid>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  myGrids: Array<Grid>;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByFirebaseId?: Maybe<User>;
  userByPhoneNumber?: Maybe<User>;
  users: Array<User>;
};


export type QuerygridArgs = {
  id: Scalars['ID']['input'];
};


export type QuerynotificationsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryuserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryuserByFirebaseIdArgs = {
  firebaseUserId: Scalars['String']['input'];
};


export type QueryuserByPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
};

export type Square = {
  __typename?: 'Square';
  columnIndex: Scalars['Int']['output'];
  columnValue: Scalars['Int']['output'];
  gamePlayer?: Maybe<GamePlayer>;
  gridId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  rowIndex: Scalars['Int']['output'];
  rowValue: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded: Notification;
};


export type SubscriptionnotificationAddedArgs = {
  userId: Scalars['String']['input'];
};

export type UpdateGridInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSquareInput = {
  gamePlayerId?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebaseUserId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ownedGrids: Array<Grid>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  playerGames: Array<GamePlayer>;
  updatedAt: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BulkAddPlayersInput: BulkAddPlayersInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BulkAssignSquaresInput: BulkAssignSquaresInput;
  CreateGridInput: CreateGridInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CreateNotificationInput: CreateNotificationInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  GamePlayer: ResolverTypeWrapper<PrismaGamePlayer>;
  Grid: ResolverTypeWrapper<PrismaGrid>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Notification: ResolverTypeWrapper<PrismaNotification>;
  NotificationAction: ResolverTypeWrapper<'GAME_INVITE' | 'GAME_STARTED' | 'SQUARE_CLAIMED' | 'GAME_COMPLETED' | 'PLAYER_JOINED' | 'GRID_ASSIGNED' | 'GENERAL'>;
  PlayerInput: PlayerInput;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Square: ResolverTypeWrapper<PrismaSquare>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdateGridInput: UpdateGridInput;
  UpdateSquareInput: UpdateSquareInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<PrismaUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BulkAddPlayersInput: BulkAddPlayersInput;
  ID: Scalars['ID']['output'];
  BulkAssignSquaresInput: BulkAssignSquaresInput;
  CreateGridInput: CreateGridInput;
  String: Scalars['String']['output'];
  CreateNotificationInput: CreateNotificationInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  GamePlayer: PrismaGamePlayer;
  Grid: PrismaGrid;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: Record<PropertyKey, never>;
  Boolean: Scalars['Boolean']['output'];
  Notification: PrismaNotification;
  PlayerInput: PlayerInput;
  Query: Record<PropertyKey, never>;
  Square: PrismaSquare;
  Subscription: Record<PropertyKey, never>;
  UpdateGridInput: UpdateGridInput;
  UpdateSquareInput: UpdateSquareInput;
  UpdateUserInput: UpdateUserInput;
  User: PrismaUser;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GamePlayerResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['GamePlayer'] = ResolversParentTypes['GamePlayer']> = {
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gridId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GridResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Grid'] = ResolversParentTypes['Grid']> = {
  columnOrder?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['GamePlayer']>, ParentType, ContextType>;
  rowOrder?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  squares?: Resolver<Array<ResolversTypes['Square']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  bulkAddPlayers?: Resolver<Maybe<ResolversTypes['Grid']>, ParentType, ContextType, RequireFields<MutationbulkAddPlayersArgs, 'input'>>;
  bulkAssignSquares?: Resolver<Array<ResolversTypes['Square']>, ParentType, ContextType, RequireFields<MutationbulkAssignSquaresArgs, 'input'>>;
  createGrid?: Resolver<ResolversTypes['Grid'], ParentType, ContextType, RequireFields<MutationcreateGridArgs, 'input'>>;
  createNotification?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationcreateNotificationArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteGrid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteGridArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  updateGrid?: Resolver<Maybe<ResolversTypes['Grid']>, ParentType, ContextType, RequireFields<MutationupdateGridArgs, 'id' | 'input'>>;
  updateSquare?: Resolver<Maybe<ResolversTypes['Square']>, ParentType, ContextType, RequireFields<MutationupdateSquareArgs, 'id' | 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id' | 'input'>>;
};

export type NotificationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  actionType?: Resolver<ResolversTypes['NotificationAction'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gridId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredByUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NotificationActionResolvers = EnumResolverSignature<{ GAME_COMPLETED?: any, GAME_INVITE?: any, GAME_STARTED?: any, GENERAL?: any, GRID_ASSIGNED?: any, PLAYER_JOINED?: any, SQUARE_CLAIMED?: any }, ResolversTypes['NotificationAction']>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  dbStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grid?: Resolver<Maybe<ResolversTypes['Grid']>, ParentType, ContextType, RequireFields<QuerygridArgs, 'id'>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  myGrids?: Resolver<Array<ResolversTypes['Grid']>, ParentType, ContextType>;
  notifications?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType, Partial<QuerynotificationsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserByEmailArgs, 'email'>>;
  userByFirebaseId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserByFirebaseIdArgs, 'firebaseUserId'>>;
  userByPhoneNumber?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserByPhoneNumberArgs, 'phoneNumber'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SquareResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Square'] = ResolversParentTypes['Square']> = {
  columnIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  columnValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gamePlayer?: Resolver<Maybe<ResolversTypes['GamePlayer']>, ParentType, ContextType>;
  gridId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rowIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rowValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  notificationAdded?: SubscriptionResolver<ResolversTypes['Notification'], "notificationAdded", ParentType, ContextType, RequireFields<SubscriptionnotificationAddedArgs, 'userId'>>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firebaseUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ownedGrids?: Resolver<Array<ResolversTypes['Grid']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerGames?: Resolver<Array<ResolversTypes['GamePlayer']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  DateTime?: GraphQLScalarType;
  GamePlayer?: GamePlayerResolvers<ContextType>;
  Grid?: GridResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  NotificationAction?: NotificationActionResolvers;
  Query?: QueryResolvers<ContextType>;
  Square?: SquareResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

