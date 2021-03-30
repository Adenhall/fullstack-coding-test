import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "components/FirebaseAuth";
import firebase from "firebase";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [blogs, setBlogs] = useState<Array<firebase.firestore.DocumentData>>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        db.collection("blogs")
          .onSnapshot((querySnapshots) => {
            let res: Array<firebase.firestore.DocumentData> = [];
            querySnapshots.forEach((doc) => {
              res.push(doc.data());
            });
            setBlogs(res);
          });
      }
    });

    return unsubscribe;
  }, []);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);

  const value = {
    currentUser,
    signUp,
    login,
    blogs,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
