/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.js";
import { fetchUserId } from "../../api/user.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        setAuthError(null);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setAuthError(null);

      if (userCredential.user && userCredential.user.uid) {
        const userData = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        const response = await axios.post("https://note-app-v05l.onrender.com/api/user/", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          setIsLoggedIn(true);
          navigate("/home/all-notes");
        }
      }
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
      setAuthError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setAuthError(null);

      if (userCredential.user && userCredential.user.uid) {
        setIsLoggedIn(true);
        navigate("/home/all-notes");
      }
    } catch (error) {
      setAuthError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWiGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser(user);
      setAuthError(null);

      if (user && user.uid) {
        const existingUser = await fetchUserId(user.uid);
        if (!existingUser) {
          const userData = {
            email: user.email,
            uid: user.uid,
          };

          await axios.post("https://note-app-v05l.onrender.com/api/user/", userData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        setIsLoggedIn(true);
        navigate("/home/all-notes");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setAuthError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      setIsLoggedIn(false);
      setAuthError(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const passwordResetEmail = async (email) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordResetSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setAuthError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authError,
        setAuthError,
        isLoading,
        isLoggedIn,
        signUp,
        signIn,
        signInWiGoogle,
        signOut,
        passwordResetEmail,
        passwordResetSent,
        setPasswordResetSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
