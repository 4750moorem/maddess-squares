import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  firebaseUserId: Scalars['String']['input'];
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
  game: Game;
  gameId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  joinedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export const GameUserRole = {
  Owner: 'OWNER',
  Player: 'PLAYER'
} as const;

export type GameUserRole = typeof GameUserRole[keyof typeof GameUserRole];
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

export const NotificationAction = {
  GameCompleted: 'GAME_COMPLETED',
  GameInvite: 'GAME_INVITE',
  GameStarted: 'GAME_STARTED',
  General: 'GENERAL',
  GridAssigned: 'GRID_ASSIGNED',
  PlayerJoined: 'PLAYER_JOINED',
  SquareClaimed: 'SQUARE_CLAIMED'
} as const;

export type NotificationAction = typeof NotificationAction[keyof typeof NotificationAction];
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
  firebaseUserId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ownedGames: Array<Game>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  playerGames: Array<GamePlayer>;
  updatedAt: Scalars['DateTime']['output'];
};

export type NotificationsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: string, userId: string, actionType: NotificationAction, iconType: string, title: string, description: string, metadata?: any | null, gameId?: string | null, triggeredByUserId?: string | null, createdAt: any, read: boolean }> };

export type CreateNotificationMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification: { __typename?: 'Notification', id: string, userId: string, actionType: NotificationAction, iconType: string, title: string, description: string, metadata?: any | null, gameId?: string | null, triggeredByUserId?: string | null, createdAt: any, read: boolean } };

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type NotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'Notification', id: string, userId: string, actionType: NotificationAction, iconType: string, title: string, description: string, metadata?: any | null, gameId?: string | null, triggeredByUserId?: string | null, createdAt: any, read: boolean } };

export type AppStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AppStatusQuery = { __typename?: 'Query', hello: string, dbStatus: string, user?: { __typename?: 'User', id: string, email?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firebaseUserId: string, email?: string | null, displayName?: string | null } | null };

export type MyGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyGamesQuery = { __typename?: 'Query', myGames: Array<{ __typename?: 'Game', id: string, name: string, description?: string | null, createdAt: any, owners: Array<{ __typename?: 'User', id: string, email?: string | null, displayName?: string | null }>, players: Array<{ __typename?: 'GamePlayer', id: string, user: { __typename?: 'User', id: string, email?: string | null, displayName?: string | null } }>, grid?: { __typename?: 'Grid', id: string } | null }> };

export type GameGridQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GameGridQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, grid?: { __typename?: 'Grid', id: string, rowOrder: Array<number>, columnOrder: Array<number>, squares: Array<{ __typename?: 'Square', id: string, rowIndex: number, columnIndex: number, rowValue: number, columnValue: number, player?: { __typename?: 'User', id: string, displayName?: string | null, email?: string | null } | null }> } | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firebaseUserId: string, email?: string | null, displayName?: string | null } };

export type CreateGameMutationVariables = Exact<{
  input: CreateGameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, name: string, description?: string | null, createdAt: any, owners: Array<{ __typename?: 'User', id: string, email?: string | null }> } };

export type CreateGridMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGridMutation = { __typename?: 'Mutation', createGrid: { __typename?: 'Grid', id: string, rowOrder: Array<number>, columnOrder: Array<number>, squares: Array<{ __typename?: 'Square', id: string, rowIndex: number, columnIndex: number, player?: { __typename?: 'User', id: string, displayName?: string | null } | null }> } };

export type AssignGridToGameMutationVariables = Exact<{
  input: AssignGridToGameInput;
}>;


export type AssignGridToGameMutation = { __typename?: 'Mutation', assignGridToGame?: { __typename?: 'Game', id: string, grid?: { __typename?: 'Grid', id: string } | null } | null };

export type UpdateSquareMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateSquareInput;
}>;


export type UpdateSquareMutation = { __typename?: 'Mutation', updateSquare?: { __typename?: 'Square', id: string, rowIndex: number, columnIndex: number, rowValue: number, columnValue: number, player?: { __typename?: 'User', id: string, displayName?: string | null, email?: string | null } | null } | null };


export const NotificationsDocument = gql`
    query Notifications($userId: String) {
  notifications(userId: $userId) {
    id
    userId
    actionType
    iconType
    title
    description
    metadata
    gameId
    triggeredByUserId
    createdAt
    read
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
// @ts-ignore
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NotificationsQuery, NotificationsQueryVariables>;
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NotificationsQuery | undefined, NotificationsQueryVariables>;
export function useNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export const CreateNotificationDocument = gql`
    mutation CreateNotification($input: CreateNotificationInput!) {
  createNotification(input: $input) {
    id
    userId
    actionType
    iconType
    title
    description
    metadata
    gameId
    triggeredByUserId
    createdAt
    read
  }
}
    `;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export const NotificationAddedDocument = gql`
    subscription NotificationAdded($userId: String!) {
  notificationAdded(userId: $userId) {
    id
    userId
    actionType
    iconType
    title
    description
    metadata
    gameId
    triggeredByUserId
    createdAt
    read
  }
}
    `;

/**
 * __useNotificationAddedSubscription__
 *
 * To run a query within a React component, call `useNotificationAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationAddedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationAddedSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<NotificationAddedSubscription, NotificationAddedSubscriptionVariables> & ({ variables: NotificationAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>(NotificationAddedDocument, options);
      }
export type NotificationAddedSubscriptionHookResult = ReturnType<typeof useNotificationAddedSubscription>;
export const AppStatusDocument = gql`
    query AppStatus {
  hello
  dbStatus
  user(id: "1") {
    id
    email
  }
}
    `;

/**
 * __useAppStatusQuery__
 *
 * To run a query within a React component, call `useAppStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppStatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AppStatusQuery, AppStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AppStatusQuery, AppStatusQueryVariables>(AppStatusDocument, options);
      }
export function useAppStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AppStatusQuery, AppStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AppStatusQuery, AppStatusQueryVariables>(AppStatusDocument, options);
        }
// @ts-ignore
export function useAppStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AppStatusQuery, AppStatusQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AppStatusQuery, AppStatusQueryVariables>;
export function useAppStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AppStatusQuery, AppStatusQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AppStatusQuery | undefined, AppStatusQueryVariables>;
export function useAppStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AppStatusQuery, AppStatusQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AppStatusQuery, AppStatusQueryVariables>(AppStatusDocument, options);
        }
export type AppStatusQueryHookResult = ReturnType<typeof useAppStatusQuery>;
export type AppStatusLazyQueryHookResult = ReturnType<typeof useAppStatusLazyQuery>;
export type AppStatusSuspenseQueryHookResult = ReturnType<typeof useAppStatusSuspenseQuery>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firebaseUserId
    email
    displayName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export const MyGamesDocument = gql`
    query MyGames {
  myGames {
    id
    name
    description
    createdAt
    owners {
      id
      email
      displayName
    }
    players {
      id
      user {
        id
        email
        displayName
      }
    }
    grid {
      id
    }
  }
}
    `;

/**
 * __useMyGamesQuery__
 *
 * To run a query within a React component, call `useMyGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyGamesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyGamesQuery, MyGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MyGamesQuery, MyGamesQueryVariables>(MyGamesDocument, options);
      }
export function useMyGamesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MyGamesQuery, MyGamesQueryVariables>(MyGamesDocument, options);
        }
// @ts-ignore
export function useMyGamesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyGamesQuery, MyGamesQueryVariables>;
export function useMyGamesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyGamesQuery | undefined, MyGamesQueryVariables>;
export function useMyGamesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyGamesQuery, MyGamesQueryVariables>(MyGamesDocument, options);
        }
export type MyGamesQueryHookResult = ReturnType<typeof useMyGamesQuery>;
export type MyGamesLazyQueryHookResult = ReturnType<typeof useMyGamesLazyQuery>;
export type MyGamesSuspenseQueryHookResult = ReturnType<typeof useMyGamesSuspenseQuery>;
export const GameGridDocument = gql`
    query GameGrid($id: ID!) {
  game(id: $id) {
    id
    grid {
      id
      rowOrder
      columnOrder
      squares {
        id
        rowIndex
        columnIndex
        rowValue
        columnValue
        player {
          id
          displayName
          email
        }
      }
    }
  }
}
    `;

/**
 * __useGameGridQuery__
 *
 * To run a query within a React component, call `useGameGridQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameGridQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameGridQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameGridQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GameGridQuery, GameGridQueryVariables> & ({ variables: GameGridQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GameGridQuery, GameGridQueryVariables>(GameGridDocument, options);
      }
export function useGameGridLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GameGridQuery, GameGridQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GameGridQuery, GameGridQueryVariables>(GameGridDocument, options);
        }
// @ts-ignore
export function useGameGridSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GameGridQuery, GameGridQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GameGridQuery, GameGridQueryVariables>;
export function useGameGridSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GameGridQuery, GameGridQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GameGridQuery | undefined, GameGridQueryVariables>;
export function useGameGridSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GameGridQuery, GameGridQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GameGridQuery, GameGridQueryVariables>(GameGridDocument, options);
        }
export type GameGridQueryHookResult = ReturnType<typeof useGameGridQuery>;
export type GameGridLazyQueryHookResult = ReturnType<typeof useGameGridLazyQuery>;
export type GameGridSuspenseQueryHookResult = ReturnType<typeof useGameGridSuspenseQuery>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    firebaseUserId
    email
    displayName
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export const CreateGameDocument = gql`
    mutation CreateGame($input: CreateGameInput!) {
  createGame(input: $input) {
    id
    name
    description
    createdAt
    owners {
      id
      email
    }
  }
}
    `;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export const CreateGridDocument = gql`
    mutation CreateGrid {
  createGrid {
    id
    rowOrder
    columnOrder
    squares {
      id
      rowIndex
      columnIndex
      player {
        id
        displayName
      }
    }
  }
}
    `;

/**
 * __useCreateGridMutation__
 *
 * To run a mutation, you first call `useCreateGridMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGridMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGridMutation, { data, loading, error }] = useCreateGridMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGridMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGridMutation, CreateGridMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateGridMutation, CreateGridMutationVariables>(CreateGridDocument, options);
      }
export type CreateGridMutationHookResult = ReturnType<typeof useCreateGridMutation>;
export const AssignGridToGameDocument = gql`
    mutation AssignGridToGame($input: AssignGridToGameInput!) {
  assignGridToGame(input: $input) {
    id
    grid {
      id
    }
  }
}
    `;

/**
 * __useAssignGridToGameMutation__
 *
 * To run a mutation, you first call `useAssignGridToGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignGridToGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignGridToGameMutation, { data, loading, error }] = useAssignGridToGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignGridToGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignGridToGameMutation, AssignGridToGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AssignGridToGameMutation, AssignGridToGameMutationVariables>(AssignGridToGameDocument, options);
      }
export type AssignGridToGameMutationHookResult = ReturnType<typeof useAssignGridToGameMutation>;
export const UpdateSquareDocument = gql`
    mutation UpdateSquare($id: ID!, $input: UpdateSquareInput!) {
  updateSquare(id: $id, input: $input) {
    id
    rowIndex
    columnIndex
    rowValue
    columnValue
    player {
      id
      displayName
      email
    }
  }
}
    `;

/**
 * __useUpdateSquareMutation__
 *
 * To run a mutation, you first call `useUpdateSquareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSquareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSquareMutation, { data, loading, error }] = useUpdateSquareMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSquareMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSquareMutation, UpdateSquareMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSquareMutation, UpdateSquareMutationVariables>(UpdateSquareDocument, options);
      }
export type UpdateSquareMutationHookResult = ReturnType<typeof useUpdateSquareMutation>;