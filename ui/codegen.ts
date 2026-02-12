import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: ['../backend/src/schema/**/*.gql'],
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        { add: { content: '// @ts-nocheck' } },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        reactApolloVersion: 4,
        apolloReactHooksImportFrom: '@apollo/client/react',
        enumsAsConst: true,
        withMutationFn: false,
        withResultType: false,
        withMutationOptionsType: false,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
        },
      },
    },
  },
}

export default config
