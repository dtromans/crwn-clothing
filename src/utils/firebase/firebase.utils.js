// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
	getAuth, 
	signInWithPopup, 
	signInWithRedirect,
	GoogleAuthProvider, 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HWXlGR66-YDI7edcjo27gkxxNz-_84s",
  authDomain: "crwn-clothing-db-14b6c.firebaseapp.com",
  projectId: "crwn-clothing-db-14b6c",
  storageBucket: "crwn-clothing-db-14b6c.appspot.com",
  messagingSenderId: "571683971821",
  appId: "1:571683971821:web:6246c7934a717ab622a2e4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log('userDocRef', userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(`userSnapshot`, userSnapshot)
  console.log(`userSnapshot.exists()`, userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    }
    catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
