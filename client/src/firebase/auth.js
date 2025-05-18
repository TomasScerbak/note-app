// import { auth } from "./firebase.js";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

// export const doSignInWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("User signed in:", userCredential.user);
//     return userCredential;
//   } catch (error) {
//     console.error("Error signing in with email and password:", error);
//     throw new Error(error.message);
//   }
// };

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential;
//   } catch (error) {
//     console.error("Error creating user with email and password:", error);
//     throw error;
//   }
// };

// export const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw error;
//   }
// };

// export const signOut = async () => {
//   try {
//     await auth.signOut();
//   } catch (error) {
//     console.error("Error signing out:", error);
//     throw error;
//   }
// };

// export const updatePassword = async (newPassword) => {
//   try {
//     const user = auth.currentUser;
//     if (user) {
//       await user.updatePassword(newPassword);
//     } else {
//       throw new Error("No user is currently signed in.");
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     throw error;
//   }
// };

// export const signInWiGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     await signInWithPopup(auth, provider).then((result) => {
//       const user = result.user;
//       if (user && user.uid) {
//         window.location.href = "/home";
//       }
//       console.log("User signed in with Google:", user);
//       return user.linkWithCredential(result.credential);
//     });
//   } catch (error) {
//     console.error("Error signing in with Google:", error);
//     throw error;
//   }
// };
