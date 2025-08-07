import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { User, RegisterProps } from "../types/auth";

// 🔁 Converte um FirebaseUser para o tipo User da aplicação
const mapFirebaseUserToUser = async (
  firebaseUser: FirebaseUser
): Promise<User> => {
  const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
  const userData = userDoc.data();

  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    name: userData?.name || firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    photoURL: userData?.photoURL || firebaseUser.photoURL || "",
  };
};

// 🔐 LOGIN COM EMAIL/SENHA
export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUserToUser(userCredential.user);
};

// 🔐 LOGIN COM GOOGLE
export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      historico: [],
      agendamentos: [],
      treinamentos: [],
      testemunhos: [],
      createdAt: new Date(),
    });
  }

  return mapFirebaseUserToUser(user);
};

// 🚪 LOGOUT
export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// 👤 OBTÉM USUÁRIO ATUAL
export const getCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe();
      if (firebaseUser) {
        const user = await mapFirebaseUserToUser(firebaseUser);
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

// 📝 REGISTRO DE USUÁRIO
export const register = async ({
  name,
  email,
  password,
}: RegisterProps): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name,
  });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    photoURL: null,
    historico: [],
    agendamentos: [],
    treinamentos: [],
    testemunhos: [],
    createdAt: new Date(),
  });

  return mapFirebaseUserToUser(user);
};
