import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "components/FirebaseAuth";
import firebase from "firebase";
import jwt_decode from "jwt-decode";
import env from ".env";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const [blogs, setBlogs] = useState<Array<firebase.firestore.DocumentData>>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      if (user) {
        user.getIdToken().then(async function (token) {
          try {
            const res = await axios({
              method: "POST",
              url: `${env.backendUrl}/auth/login`,
              data: { idToken: token },
            });
            const user: any = jwt_decode(res?.data?.accessToken);
            if (user) {
              setCurrentUser(res?.data?.accessToken);
              user.role === "admin" ? router.push("/dashboard") : router.push("/blogs");
            }
          } catch (error) {
            throw error;
          }
        });
        db.collection("blogs").onSnapshot((querySnapshots) => {
          let res: Array<firebase.firestore.DocumentData> = [];
          querySnapshots.forEach((doc) => {
            const data = {
              ...doc.data(),
              id: doc.id,
            };
            res.push(data);
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
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
