import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
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

const client = new ApolloClient({
  link: from([authLink, httpLink]),
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
