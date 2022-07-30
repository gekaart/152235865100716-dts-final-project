import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJjf8dwZlAUFa2VQ2Lj7XYn2DZw9-hZ-A",
  authDomain: "dts-final-project-10cd2.firebaseapp.com",
  projectId: "dts-final-project-10cd2",
  storageBucket: "dts-final-project-10cd2.appspot.com",
  messagingSenderId: "972681391738",
  appId: "1:972681391738:web:c9e311c4edb19087add5c3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const loginWithEmailPassword = async (email, password) => {
//   try {
//     const res = await signInWithEmailAndPassword(auth, email, password);
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

const logouthandle = () => {
  signOut(auth);
};

export { auth, logouthandle };
