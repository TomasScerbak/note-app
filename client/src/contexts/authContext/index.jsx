/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.js";
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
        setAuthError(null); // Clear any previous error
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setAuthError(null); // Clear any previous error

      if (userCredential.user && userCredential.user.uid) {
        // Send user data to the backend
        const userData = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        };
        const response = await axios.post("http://localhost:5000/api/user/", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          setIsLoggedIn(true);
          navigate("/home/all-notes"); // Redirect to the all notes page after signup
        }
      }
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
      setAuthError(error.message); // Store the error message
      return error.message;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setAuthError(null); // Clear previous error

      if (userCredential.user && userCredential.user.uid) {
        navigate("/home/all-notes"); // Redirect to the all notes page after sign in
        setIsLoggedIn(true);
      }
    } catch (error) {
      setAuthError(error.message);
      return error.message;
    }
  };

  const signInWiGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        setUser(user);
        setAuthError(null); // Clear previous error
        if (user && user.uid) {
          navigate("/home/all-notes"); // Redirect to the all notes page after sign in
          setIsLoggedIn(true);
        }
      });
    } catch (error) {
      setAuthError(error.message);
      return error.message;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsLoggedIn(false);
      setAuthError(null); // Clear any previous error
      navigate("/"); // Redirect to the login page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthError(error.message); // Store the error message
      return error.message;
    }
  };

  const passwordResetEmail = async (email) => {
    try {
      sendPasswordResetEmail(auth, email);
      setPasswordResetSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setAuthError(error.message); // Store the error message
      return error.message;
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
