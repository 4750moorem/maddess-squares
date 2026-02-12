import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { ApolloClient, ApolloLink, InMemoryCache, Observable, from, split, type FetchResult } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-sse'
import { print } from 'graphql'
import './tailwind.css'
import AppRoutes from './routes.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { auth } from './lib/firebase'

registerSW({ immediate: true })

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL })

const authLink = setContext(async (_, { headers }) => {
  await auth.authStateReady()
  const user = auth.currentUser
  const token = user ? await user.getIdToken() : null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const sseClient = createClient({
  url: import.meta.env.VITE_API_URL,
  headers: async () => {
    await auth.authStateReady()
    const user = auth.currentUser
    const token = user ? await user.getIdToken() : null
    return {
      authorization: token ? `Bearer ${token}` : '',
    }
  },
})

const sseLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const dispose = sseClient.subscribe(
      {
        query: print(operation.query),
        variables: operation.variables,
        operationName: operation.operationName,
        extensions: operation.extensions,
      },
      {
        next: (data: FetchResult) => observer.next(data),
        error: (err: unknown) => observer.error(err instanceof Error ? err : new Error(String(err))),
        complete: () => observer.complete(),
      },
    )
    return () => dispose()
  })
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  sseLink,
  from([authLink, httpLink]),
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <AppRoutes />
      </ApolloProvider>
    </AuthProvider>
  </StrictMode>,
)
