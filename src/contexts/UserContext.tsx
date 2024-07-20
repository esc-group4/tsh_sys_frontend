import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase-config";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;

}

interface AuthProviderProps {
    children: ReactNode;
  }

 // PUT THIS HERE FOR FUTURE USE 
  const signIn = async (email: string, password: string): Promise<string | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      // Send the token to your backend, some kind of axios or fetch thingy
      return token;
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  

  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
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
    login
  };
  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
