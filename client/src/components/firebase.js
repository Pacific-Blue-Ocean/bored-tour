import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import 'regenerator-runtime/runtime';
import firebaseConfig from '../../../config';
import axios from 'axios';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const body = {
      id: user.uid,
      email,
      full_name: name,
    }

    await axios.post('/api/users/add', body);

    await addDoc(collection(db, 'users'), {
      id: user.uid,
      displayName: name,
      authProvider: 'local',
      email,
    });

    signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
   alert(err.message);
  }
};

const PasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  PasswordReset,
  logout,
};