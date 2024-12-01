import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCg7e1WHmsmD9JECj5JhWfEat72KaQZ8jM",
  authDomain: "sislicitacao.firebaseapp.com",
  projectId: "sislicitacao",
  storageBucket: "sislicitacao.firebasestorage.app",
  messagingSenderId: "70707573242",
  appId: "1:70707573242:web:19e5b3300216a702d3f443",
  measurementId: "G-Q2BVXS4C7C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;