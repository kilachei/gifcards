import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBPTsO--YwvsGLtb2bl-DaNmk40-ciWlss",
  authDomain: "kilacheigc.firebaseapp.com",
  projectId: "kilacheigc",
  storageBucket: "kilacheigc.firebasestorage.app",
  messagingSenderId: "267055022685",
  appId: "1:267055022685:web:f4f431d16cdffd0a4903b4"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)