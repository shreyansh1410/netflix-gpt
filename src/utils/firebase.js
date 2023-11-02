// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZSx4T0nLdUHHpoHknB7pnPhmkxdJDf8c",
  authDomain: "netflix-gpt-7fa6f.firebaseapp.com",
  projectId: "netflix-gpt-7fa6f",
  storageBucket: "netflix-gpt-7fa6f.appspot.com",
  messagingSenderId: "167017639712",
  appId: "1:167017639712:web:6fafccfd926fed6adc7145",
  measurementId: "G-ZM8JD9L0CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();