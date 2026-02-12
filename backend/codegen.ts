import type { CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
  schema: ['src/schema/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    'src/schema': defineConfig({
      resolverGeneration: 'recommended',
      resolverTypesPath: './types.generated.ts',
      typeDefsFilePath: './typeDefs.generated.ts',
      scalarsOverrides: {
        DateTime: { type: 'Date | string' },
      },
      typesPluginsConfig: {
        contextType: './context#GraphQLContext',
        useTypeImports: true,
        mappers: {
          User: '../generated/prisma/client#User as PrismaUser',
          GamePlayer: '../generated/prisma/client#GamePlayer as PrismaGamePlayer',
          Grid: '../generated/prisma/client#Grid as PrismaGrid',
          Square: '../generated/prisma/client#Square as PrismaSquare',
          Notification: '../generated/prisma/client#Notification as PrismaNotification',
        },
      },
    }),
    'src/schema/generated/graphql-client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
}

export default config
