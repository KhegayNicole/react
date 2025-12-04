import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA4nclg7gSO4kGvcTcGj5HBzfcPgxyRFXY',
  authDomain: 'evrthng-store.firebaseapp.com',
  projectId: 'evrthng-store',
  storageBucket: 'evrthng-store.firebasestorage.app',
  messagingSenderId: '516510635542',
  appId: '1:516510635542:web:a4f6b01b78f128bde44737',
  measurementId: 'G-RLV1FGG99P',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

