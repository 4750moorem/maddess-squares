import type { GraphQLConfig } from 'graphql-config'

const config: GraphQLConfig = {
  schema: ['src/schema/**/*.gql'],
  documents: ['src/**/*.graphql', 'src/**/*.gql'],
}

export default config
