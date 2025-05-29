import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "resume-cover-letter-builder.firebaseapp.com",
  projectId: "resume-cover-letter-builder",
  storageBucket: "resume-cover-letter-builder.firebasestorage.app",
  messagingSenderId: "1082760438005",
  appId: "1:1082760438005:web:a95ec3bee811daa991a5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;