import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase";

interface IContextProps {
  user: User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<
    | { success: boolean; error?: undefined }
    | { error: string; success?: undefined }
    | undefined
  >;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext({} as IContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      console.log(resp);

      //Create a firestore collection named users with key=email and value as savedMovies:[]
      setDoc(doc(db, "users", email), { savedMovies: [] });
      return { success: true };
    } catch (error) {
      if (error instanceof Error) return { error: error.message };
    }
  }, []);

  const logIn = useCallback((email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logOut = useCallback(() => {
    return signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
