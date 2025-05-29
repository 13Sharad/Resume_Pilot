import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestMode, setGuestMode] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setGuestMode(false);   
    return signOut(auth);
  }

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function guestLogin() {
    setGuestMode(true);
    setCurrentUser({ guest: true, uid: 'guest' });  // fake guest user
    return Promise.resolve();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleSignIn,
    guestLogin,
    guestMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
