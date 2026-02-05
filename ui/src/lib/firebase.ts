import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD3vhXBdXbG0g4ZBP7MYVLhQsEuU8VN6Qs',
  authDomain: 'madness-squares.firebaseapp.com',
  projectId: 'madness-squares',
  storageBucket: 'madness-squares.firebasestorage.app',
  messagingSenderId: '973055652864',
  appId: '1:973055652864:web:28f8449d06f167457f14e5',
}

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(firebaseApp)
