import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextType | null>(null)
