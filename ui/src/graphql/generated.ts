import { gql } from '@apollo/client';
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
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  dbStatus: Scalars['String']['output'];
  hello: Scalars['String']['output'];
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type AppStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AppStatusQuery = { __typename?: 'Query', hello: string, dbStatus: string, user?: { __typename?: 'User', id: string, email: string } | null };


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
export function useAppStatusSuspenseQuery(
  baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AppStatusQuery, AppStatusQueryVariables>
): ApolloReactHooks.UseSuspenseQueryResult<AppStatusQuery | undefined, AppStatusQueryVariables> {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AppStatusQuery | undefined, AppStatusQueryVariables>(AppStatusDocument, options);
        }
export type AppStatusQueryHookResult = ReturnType<typeof useAppStatusQuery>;
export type AppStatusLazyQueryHookResult = ReturnType<typeof useAppStatusLazyQuery>;
export type AppStatusSuspenseQueryHookResult = ReturnType<typeof useAppStatusSuspenseQuery>;
export type AppStatusQueryResult = AppStatusQueryHookResult;