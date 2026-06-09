import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const generatedPhoto =
        photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name,
        )}&background=random`;

      await updateProfile(result.user, {
        displayName: name,
        photoURL: generatedPhoto,
      });

      await result.user.reload();

      setUser(auth.currentUser);

      return result;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    setLoading(true);

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
