import { initializeApp, cert, type App } from 'firebase-admin/app'
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth'

let firebaseAdmin: App | null = null

function getFirebaseAdmin(): App {
  if (firebaseAdmin) return firebaseAdmin

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT
  if (serviceAccountJson) {
    const parsed: unknown = JSON.parse(serviceAccountJson)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('projectId' in parsed) ||
      !('clientEmail' in parsed) ||
      !('privateKey' in parsed)
    ) {
      throw new Error('Invalid Firebase service account config')
    }
    const serviceAccount = parsed as {
      projectId: string
      clientEmail: string
      privateKey: string
    }
    firebaseAdmin = initializeApp({
      credential: cert(serviceAccount),
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
