import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
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
    console.log("signUp called with email:", email, "and password:", password);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setAuthError(null); // Clear any previous error

      if (userCredential.user && userCredential.user.uid) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
      setAuthError(error.message); // Store the error message
    }
  };

  const signIn = async (email, password) => {
    console.log("signIn called with email:", email, "and password:", password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setUser(userCredential.user);
      setAuthError(null); // Clear previous error

      if (userCredential.user && userCredential.user.uid) {
        navigate("/home");
      }
    } catch (error) {
      setAuthError(error.message);
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
          navigate("/home");
        }
      });
    } catch (error) {
      setAuthError(error.message);
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
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authError, isLoading, isLoggedIn, signUp, signIn, signInWiGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
