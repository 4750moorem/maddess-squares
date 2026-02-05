/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { dbStatus as Query_dbStatus } from './user/resolvers/Query/dbStatus';
import    { hello as Query_hello } from './user/resolvers/Query/hello';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { User } from './user/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { dbStatus: Query_dbStatus,hello: Query_hello,user: Query_user },
      Mutation: { createUser: Mutation_createUser },
      
      User: User
    }