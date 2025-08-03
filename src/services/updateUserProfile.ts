import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateUserProfileImage = async (userId: string, imageUrl: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { photoURL: imageUrl });
};
