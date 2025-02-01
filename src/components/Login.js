import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateEmailPass } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleAuth = () => {
    const message = validateEmailPass(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignedIn) {
      createUserWithEmailAndPassword(
        getAuth(),
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth?.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Successfully signed in
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Background Image Container */}
      <div className="fixed inset-0 -z-10">
        <img
          src={BACKGROUND_IMG_URL}
          alt="background"
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-black bg-opacity-80 rounded-xl shadow-2xl p-8 space-y-6"
          >
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              {isSignedIn ? "Welcome Back" : "Create Account"}
            </h1>

            <div className="space-y-4">
              {!isSignedIn && (
                <div>
                  <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-14 px-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>
              )}

              <div>
                <input
                  ref={email}
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-14 px-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />
              </div>

              <div>
                <input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  className="w-full h-14 px-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm text-center mt-2">
                {errorMessage}
              </p>
            )}

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 ease-in-out transform hover:scale-[1.02]"
              onClick={handleAuth}
            >
              {isSignedIn ? "Sign In" : "Sign Up"}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-white hover:text-red-600 transition-colors text-sm font-medium"
                onClick={handleSignIn}
              >
                {isSignedIn
                  ? "New to our platform? Sign up now"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Shreyansh Shukla
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
