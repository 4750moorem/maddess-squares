import { gql } from '@apollo/client';
// @ts-ignore
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
};

export type AddUserToGameInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  gameId: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role: GameUserRole;
};

export type CreateGameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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
export type Mutation = {
  __typename?: 'Mutation';
  addUserToGame?: Maybe<Game>;
  createGame: Game;
  createUser: User;
  deleteGame: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  removeUserFromGame?: Maybe<Game>;
  updateGame?: Maybe<Game>;
  updateUser?: Maybe<User>;
};


export type MutationAddUserToGameArgs = {
  input: AddUserToGameInput;
};


export type MutationCreateGameArgs = {
  input: CreateGameInput;
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


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  dbStatus: Scalars['String']['output'];
  game?: Maybe<Game>;
  games: Array<Game>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  myGames: Array<Game>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByFirebaseId?: Maybe<User>;
  userByPhoneNumber?: Maybe<User>;
  users: Array<User>;
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
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

export type UpdateGameInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type AppStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AppStatusQuery = { __typename?: 'Query', hello: string, dbStatus: string, user?: { __typename?: 'User', id: string, email?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firebaseUserId: string, email?: string | null, displayName?: string | null } | null };

export type MyGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyGamesQuery = { __typename?: 'Query', myGames: Array<{ __typename?: 'Game', id: string, name: string, description?: string | null, createdAt: any, owners: Array<{ __typename?: 'User', id: string, email?: string | null, displayName?: string | null }>, players: Array<{ __typename?: 'GamePlayer', id: string, user: { __typename?: 'User', id: string, email?: string | null, displayName?: string | null } }> }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firebaseUserId: string, email?: string | null, displayName?: string | null } };

export type CreateGameMutationVariables = Exact<{
  input: CreateGameInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, name: string, description?: string | null, createdAt: any, owners: Array<{ __typename?: 'User', id: string, email?: string | null }> } };


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
// @ts-ignore
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
// @ts-ignore
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
// @ts-ignore
export function useMyGamesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MyGamesQuery | undefined, MyGamesQueryVariables>;
export function useMyGamesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MyGamesQuery, MyGamesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MyGamesQuery, MyGamesQueryVariables>(MyGamesDocument, options);
        }
export type MyGamesQueryHookResult = ReturnType<typeof useMyGamesQuery>;
export type MyGamesLazyQueryHookResult = ReturnType<typeof useMyGamesLazyQuery>;
export type MyGamesSuspenseQueryHookResult = ReturnType<typeof useMyGamesSuspenseQuery>;
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
