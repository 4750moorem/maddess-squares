import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddUserToGameInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  gameId: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role: GameUserRole;
};

export type AssignGridToGameInput = {
  gameId: Scalars['ID']['input'];
  gridId: Scalars['ID']['input'];
};

export type BulkAddPlayersInput = {
  gameId: Scalars['ID']['input'];
  players: Array<PlayerInput>;
};

export type CreateGameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateNotificationInput = {
  actionType: NotificationAction;
  description: Scalars['String']['input'];
  gameId?: InputMaybe<Scalars['String']['input']>;
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

export type Game = {
  __typename?: 'Game';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  grid?: Maybe<Grid>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owners: Array<User>;
  players: Array<GamePlayer>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GamePlayer = {
  __typename?: 'GamePlayer';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  game: Game;
  gameId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  joinedAt: Scalars['DateTime']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  tempPlayer?: Maybe<TempPlayer>;
  tempUserId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum GameUserRole {
  Owner = 'OWNER',
  Player = 'PLAYER'
}

export type Grid = {
  __typename?: 'Grid';
  columnOrder: Array<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  id: Scalars['ID']['output'];
  rowOrder: Array<Scalars['Int']['output']>;
  squares: Array<Square>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToGame?: Maybe<Game>;
  assignGridToGame?: Maybe<Game>;
  bulkAddPlayers?: Maybe<Game>;
  createGame: Game;
  createGrid: Grid;
  createNotification: Notification;
  createUser: User;
  deleteGame: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  removeUserFromGame?: Maybe<Game>;
  updateGame?: Maybe<Game>;
  updateSquare?: Maybe<Square>;
  updateUser?: Maybe<User>;
};


export type MutationAddUserToGameArgs = {
  input: AddUserToGameInput;
};


export type MutationAssignGridToGameArgs = {
  input: AssignGridToGameInput;
};


export type MutationBulkAddPlayersArgs = {
  input: BulkAddPlayersInput;
};


export type MutationCreateGameArgs = {
  input: CreateGameInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserFromGameArgs = {
  input: RemoveUserFromGameInput;
};


export type MutationUpdateGameArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGameInput;
};


export type MutationUpdateSquareArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSquareInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  actionType: NotificationAction;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  gameId?: Maybe<Scalars['String']['output']>;
  iconType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  triggeredByUserId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export enum NotificationAction {
  GameCompleted = 'GAME_COMPLETED',
  GameInvite = 'GAME_INVITE',
  GameStarted = 'GAME_STARTED',
  General = 'GENERAL',
  GridAssigned = 'GRID_ASSIGNED',
  PlayerJoined = 'PLAYER_JOINED',
  SquareClaimed = 'SQUARE_CLAIMED'
}

export type PlayerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  dbStatus: Scalars['String']['output'];
  game?: Maybe<Game>;
  games: Array<Game>;
  grid?: Maybe<Grid>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  myGames: Array<Game>;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByFirebaseId?: Maybe<User>;
  userByPhoneNumber?: Maybe<User>;
  users: Array<User>;
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGridArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByFirebaseIdArgs = {
  firebaseUserId: Scalars['String']['input'];
};


export type QueryUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
};

export type RemoveUserFromGameInput = {
  gameId: Scalars['ID']['input'];
  role: GameUserRole;
  userId: Scalars['ID']['input'];
};

export type Square = {
  __typename?: 'Square';
  columnIndex: Scalars['Int']['output'];
  columnValue: Scalars['Int']['output'];
  gridId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  player?: Maybe<User>;
  rowIndex: Scalars['Int']['output'];
  rowValue: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded: Notification;
};


export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['String']['input'];
};

export type TempPlayer = {
  __typename?: 'TempPlayer';
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type UpdateGameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSquareInput = {
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
  ownedGames: Array<Game>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  playerGames: Array<GamePlayer>;
  updatedAt: Scalars['DateTime']['output'];
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;