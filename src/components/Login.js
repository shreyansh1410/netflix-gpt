import React, { useState, useRef } from 'react'
import Header from './Header';
import { validateEmailPass } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { getAuth } from 'firebase/auth';
import { BACKGROUND_IMG_URL, USER_AVATAR } from '../utils/constants';


const Login = () => {
    const dispatch = useDispatch();
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleSignIn = () => {
        setIsSignedIn(!isSignedIn);
    }

    const handleAuth = () => {
        const message = validateEmailPass(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignedIn) {
            createUserWithEmailAndPassword(getAuth(), email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name?.current?.value,
                        photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth?.currentUser;     //fetch user from the updated value (auth.currentUser), not user written above because that is the older value
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            }));

                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                        // ...
                    });

                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "---" + errorMessage);
                    // ..
                });
        } else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "---" + errorMessage);
                });
        }


    }

    return (
        <div>
            <Header />
            <div className='w-full h-full absolute brightness-50'>
                <img src={BACKGROUND_IMG_URL} alt='background' className='max-h-screen w-screen object-cover'></img>
            </div>
            <form onSubmit={(e) => { e.preventDefault() }} className='absolute text-white h-[580px] w-11/12 md:w-3/12 mx-auto left-0 right-0 my-24 p-8 bg-black bg-opacity-80'>
                <h1 className='text-4xl font-semibold py-8'>{isSignedIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignedIn && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />}
                <input ref={email} type='text' placeholder='Email Address' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />
                <input ref={password} type='password' placeholder='Password' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />
                <p className='cursor-pointer flex justify-center text-red-600 text-xs'>{errorMessage}</p>
                <button className='bg-red-600 rounded-lg px-10 py-2 my-4 w-full font-semibold saturate-150' onClick={handleAuth}> {isSignedIn ? "Sign In" : "Sign Up"}</button>

                <p className='cursor-pointer font-bold mb-8 my-4' onClick={handleSignIn}>{isSignedIn ? "Don't have an account, Sign Up Now!" : "Already registered, Sign In now!"}</p>
                <p className='cursor-pointer mb-8 my-4 flex justify-center'>&copy; Shreyansh Shukla</p>
            </form>
        </div>
    )
}

export default Login
