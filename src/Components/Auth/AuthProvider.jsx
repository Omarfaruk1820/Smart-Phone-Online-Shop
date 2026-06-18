import { createContext, useEffect, useState } from "react";
import axios from "axios";
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

const API_URL = "http://localhost:5000/users";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ================= ROLE FETCH =================
  const fetchUserRole = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/role/${encodeURIComponent(email)}`,
      );
      setRole(res.data.role || "user");
    } catch {
      setRole("user");
    }
  };

  // ================= SAVE USER =================
  const saveUserToDB = async (userData) => {
    try {
      await axios.post(API_URL, userData);
    } catch (error) {
      console.log("DB Error:", error.message);
    }
  };

  // ================= REGISTER =================
  const createUser = async (email, password, name) => {
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

      await updateProfile(result.user, {
        displayName: name,
        photoURL: avatar,
      });

      const currentUser = {
        name,
        email,
        uid: result.user.uid,
        photoURL: avatar,
        role: "user",
        createdAt: new Date(),
      };

      setUser(currentUser);
      setRole("user");

      await saveUserToDB(currentUser);

      return result;
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGIN =================
  const signInUser = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const currentUser = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        photoURL: result.user.photoURL,
      };

      setUser(currentUser);

      await fetchUserRole(currentUser.email);

      return result;
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const signInWithGoogle = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const currentUser = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        photoURL: result.user.photoURL,
      };

      setUser(currentUser);

      await fetchUserRole(currentUser.email);
      await saveUserToDB(currentUser);

      return result;
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const logOutUser = async () => {
    await signOut(auth);
    setUser(null);
    setRole("user");
  };

  // ================= OBSERVER =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const data = {
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        };

        setUser(data);
        await fetchUserRole(currentUser.email);
      } else {
        setUser(null);
        setRole("user");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
