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
      typesPluginsConfig: {
        contextType: './context#GraphQLContext',
        useTypeImports: true,
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
