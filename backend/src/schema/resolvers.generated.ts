/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { dbStatus as Query_dbStatus } from './user/resolvers/Query/dbStatus';
import    { grid as Query_grid } from './grid/resolvers/Query/grid';
import    { hello as Query_hello } from './user/resolvers/Query/hello';
import    { me as Query_me } from './user/resolvers/Query/me';
import    { myGrids as Query_myGrids } from './grid/resolvers/Query/myGrids';
import    { notifications as Query_notifications } from './notification/resolvers/Query/notifications';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { userByEmail as Query_userByEmail } from './user/resolvers/Query/userByEmail';
import    { userByFirebaseId as Query_userByFirebaseId } from './user/resolvers/Query/userByFirebaseId';
import    { userByPhoneNumber as Query_userByPhoneNumber } from './user/resolvers/Query/userByPhoneNumber';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { bulkAddPlayers as Mutation_bulkAddPlayers } from './grid/resolvers/Mutation/bulkAddPlayers';
import    { bulkAssignSquares as Mutation_bulkAssignSquares } from './grid/resolvers/Mutation/bulkAssignSquares';
import    { createGrid as Mutation_createGrid } from './grid/resolvers/Mutation/createGrid';
import    { createNotification as Mutation_createNotification } from './notification/resolvers/Mutation/createNotification';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { deleteGrid as Mutation_deleteGrid } from './grid/resolvers/Mutation/deleteGrid';
import    { deleteUser as Mutation_deleteUser } from './user/resolvers/Mutation/deleteUser';
import    { updateGrid as Mutation_updateGrid } from './grid/resolvers/Mutation/updateGrid';
import    { updateSquare as Mutation_updateSquare } from './grid/resolvers/Mutation/updateSquare';
import    { updateUser as Mutation_updateUser } from './user/resolvers/Mutation/updateUser';
import    { notificationAdded as Subscription_notificationAdded } from './notification/resolvers/Subscription/notificationAdded';
import    { GamePlayer } from './grid/resolvers/GamePlayer';
import    { Grid } from './grid/resolvers/Grid';
import    { Notification } from './notification/resolvers/Notification';
import    { Square } from './grid/resolvers/Square';
import    { User } from './user/resolvers/User';
import    { DateTimeResolver,JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { dbStatus: Query_dbStatus,grid: Query_grid,hello: Query_hello,me: Query_me,myGrids: Query_myGrids,notifications: Query_notifications,user: Query_user,userByEmail: Query_userByEmail,userByFirebaseId: Query_userByFirebaseId,userByPhoneNumber: Query_userByPhoneNumber,users: Query_users },
      Mutation: { bulkAddPlayers: Mutation_bulkAddPlayers,bulkAssignSquares: Mutation_bulkAssignSquares,createGrid: Mutation_createGrid,createNotification: Mutation_createNotification,createUser: Mutation_createUser,deleteGrid: Mutation_deleteGrid,deleteUser: Mutation_deleteUser,updateGrid: Mutation_updateGrid,updateSquare: Mutation_updateSquare,updateUser: Mutation_updateUser },
      Subscription: { notificationAdded: Subscription_notificationAdded },
      GamePlayer: GamePlayer,
Grid: Grid,
Notification: Notification,
Square: Square,
User: User,
DateTime: DateTimeResolver,
JSON: JSONResolver
    }