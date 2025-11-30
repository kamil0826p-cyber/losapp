// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  setPersistence,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBupOe_ykB7QSsbBokiY-pHNJo-iY9BATk',
  authDomain: 'losai-71815.firebaseapp.com',
  databaseURL: 'https://losai-71815-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'losai-71815',
  storageBucket: 'losai-71815.firebasestorage.app',
  messagingSenderId: '1003858567281',
  appId: '1:1003858567281:web:8339fa9acea3047a027bd0',
  measurementId: 'G-9DTNG5TR03',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

// Auth
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

export { app, db, auth, onAuthStateChanged, onIdTokenChanged }
