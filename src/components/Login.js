import React, { useState } from 'react'
import Header from './Header';

const Login = () => {

    const [isSignedIn, setIsSignedIn] = useState(true);

    const handleSignIn = () => {
        setIsSignedIn(!isSignedIn);
    }

    return (
        <div>
            <Header />
            <div className='absolute brightness-50'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='background'></img>
            </div>
            <form className='absolute text-white w-3/12 mx-auto left-0 right-0 my-48 p-12 bg-black bg-opacity-80'>
                <h1 className='text-4xl font-semibold py-8'>{isSignedIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignedIn && <input type='text' placeholder='Email or Phone Number' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />}
                <input type='text' placeholder='Email or Phone Number' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />
                <input type='password' placeholder='Password' className='p-4 my-2 w-full h-14 rounded-lg bg-gray-800' />
                <button className='bg-red-600 rounded-lg px-10 py-2 my-6 w-full font-semibold saturate-150'> {isSignedIn ? "Sign In" : "Sign Up"}</button>
                <p className='cursor-pointer font-bold mb-10 my-6' onClick={handleSignIn}>{isSignedIn ? "Don't have an account, Sign Up Now!" : "Already registered, Sign In now!"}</p>
            </form>
        </div>
    )
}

export default Login
