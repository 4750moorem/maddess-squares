import type { GraphQLConfig } from 'graphql-config'

const config: GraphQLConfig = {
  schema: ['../backend/src/schema/**/*.gql'],
  documents: ['src/**/*.graphql'],
}

export default config
