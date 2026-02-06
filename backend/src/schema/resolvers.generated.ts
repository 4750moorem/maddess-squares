/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { dbStatus as Query_dbStatus } from './user/resolvers/Query/dbStatus';
import    { game as Query_game } from './game/resolvers/Query/game';
import    { games as Query_games } from './game/resolvers/Query/games';
import    { grid as Query_grid } from './grid/resolvers/Query/grid';
import    { hello as Query_hello } from './user/resolvers/Query/hello';
import    { me as Query_me } from './user/resolvers/Query/me';
import    { myGames as Query_myGames } from './game/resolvers/Query/myGames';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { userByEmail as Query_userByEmail } from './user/resolvers/Query/userByEmail';
import    { userByFirebaseId as Query_userByFirebaseId } from './user/resolvers/Query/userByFirebaseId';
import    { userByPhoneNumber as Query_userByPhoneNumber } from './user/resolvers/Query/userByPhoneNumber';
import    { users as Query_users } from './user/resolvers/Query/users';
import    { addUserToGame as Mutation_addUserToGame } from './game/resolvers/Mutation/addUserToGame';
import    { createGame as Mutation_createGame } from './game/resolvers/Mutation/createGame';
import    { createGrid as Mutation_createGrid } from './grid/resolvers/Mutation/createGrid';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { deleteGame as Mutation_deleteGame } from './game/resolvers/Mutation/deleteGame';
import    { deleteUser as Mutation_deleteUser } from './user/resolvers/Mutation/deleteUser';
import    { removeUserFromGame as Mutation_removeUserFromGame } from './game/resolvers/Mutation/removeUserFromGame';
import    { updateGame as Mutation_updateGame } from './game/resolvers/Mutation/updateGame';
import    { updateUser as Mutation_updateUser } from './user/resolvers/Mutation/updateUser';
import    { Game } from './game/resolvers/Game';
import    { GamePlayer } from './game/resolvers/GamePlayer';
import    { Grid } from './grid/resolvers/Grid';
import    { Square } from './grid/resolvers/Square';
import    { User } from './user/resolvers/User';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { dbStatus: Query_dbStatus,game: Query_game,games: Query_games,grid: Query_grid,hello: Query_hello,me: Query_me,myGames: Query_myGames,user: Query_user,userByEmail: Query_userByEmail,userByFirebaseId: Query_userByFirebaseId,userByPhoneNumber: Query_userByPhoneNumber,users: Query_users },
      Mutation: { addUserToGame: Mutation_addUserToGame,createGame: Mutation_createGame,createGrid: Mutation_createGrid,createUser: Mutation_createUser,deleteGame: Mutation_deleteGame,deleteUser: Mutation_deleteUser,removeUserFromGame: Mutation_removeUserFromGame,updateGame: Mutation_updateGame,updateUser: Mutation_updateUser },
      
      Game: Game,
GamePlayer: GamePlayer,
Grid: Grid,
Square: Square,
User: User,
DateTime: DateTimeResolver
    }