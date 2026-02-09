import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useCreateUserMutation } from '@/graphql/generated'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { signIn, signUp, user } = useAuth()
  const navigate = useNavigate()
  const [createUser] = useCreateUserMutation()

  if (user) {
    navigate('/', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        const userCredential = await signUp(email, password)
        if (userCredential) {
          await createUser({
            variables: {
              input: {
                firebaseUserId: userCredential.uid,
                email: userCredential.email ?? undefined,
                displayName: userCredential.displayName ?? undefined,
              },
            },
          })
        }
      } else {
        await signIn(email, password)
      }
      navigate('/', { replace: true })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md px-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Maddess Squares
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? 'Join the pool and claim your squares'
                : 'Welcome back to the tournament'}
            </p>
          </div>

          {/* Form card */}
          <div className="retro-card p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="retro-input w-full"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="retro-input w-full"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-md border-2 border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? 'Loading...'
                  : isSignUp
                    ? 'Create Account'
                    : 'Sign In'}
              </Button>
            </form>
          </div>

          {/* Toggle sign up / sign in */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
