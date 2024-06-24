// google auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMT-SNHMO6qawnLyd76DYDdDWe3aw34dQ",
  authDomain: "login-65da2.firebaseapp.com",
  projectId: "login-65da2",
  storageBucket: "login-65da2.appspot.com",
  messagingSenderId: "1095766435743",
  appId: "1:1095766435743:web:e35b61de584e2e84247faa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();


//sign user in
const googleLoginButton = document.querySelector('#gmail-auth-button');

const userSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.error('There was a problem signing in.');
  }
}

// sign user out
// const userSignOut = async () => {
//   try {
//     const signingUserOut = await signOut(auth);
//     alert('You have successfully signed out!');
//   } catch (error) {
//     console.error('There was a problem signing out.');
//   }
// }

googleLoginButton.addEventListener('click', userSignIn);
// googleLogoutButton.addEventListener('click', userSignIn);
