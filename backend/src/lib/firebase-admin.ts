import { initializeApp, cert, type App } from 'firebase-admin/app'
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth'

let firebaseAdmin: App | null = null

function getFirebaseAdmin(): App {
  if (firebaseAdmin) return firebaseAdmin

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT
  if (serviceAccountJson) {
    const parsed: unknown = JSON.parse(serviceAccountJson)
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid Firebase service account config')
    }
    const raw = parsed as Record<string, unknown>

    // Firebase service account JSON uses snake_case keys
    const projectId = raw.projectId ?? raw.project_id
    const clientEmail = raw.clientEmail ?? raw.client_email
    const privateKey = raw.privateKey ?? raw.private_key

    if (
      typeof projectId !== 'string' ||
      typeof clientEmail !== 'string' ||
      typeof privateKey !== 'string'
    ) {
      throw new Error(
        'Firebase service account missing projectId, clientEmail, or privateKey',
      )
    }

    firebaseAdmin = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    })
  } else {
    firebaseAdmin = initializeApp()
  }

  return firebaseAdmin
}

export async function verifyIdToken(
  token: string,
): Promise<DecodedIdToken | null> {
  try {
    const app = getFirebaseAdmin()
    const auth = getAuth(app)
    return await auth.verifyIdToken(token)
  } catch {
    return null
  }
}
