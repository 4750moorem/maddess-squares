import { useAppStatusQuery } from './graphql/generated.ts'
import { Button } from '@/components/ui/button'

function App() {
  const { data, loading, error } = useAppStatusQuery()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              March Madness Squares
            </p>
            <h1 className="text-3xl font-semibold">API status</h1>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {loading ? 'Loading...' : error ? 'Error' : 'Ready'}
              </p>
              {data && (
                <div className="space-y-1 text-sm">
                  <p>{data.hello}</p>
                  <p>DB: {data.dbStatus}</p>
                  <p>User: {data.user?.email ?? 'n/a'}</p>
                </div>
              )}
              <Button size="sm">Refresh</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
