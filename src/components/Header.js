import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const gpt = useSelector((store) => store.gpt);
    const dispatch = useDispatch();

    const isGpt = gpt.showGptSearch;

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    const handleGptSearchView = () => {
        dispatch(toggleGptSearchView());
    }

    const handleChangeLanguage = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    useEffect(() => {           //writing in useEffect coz we only have to do this only once
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    }));
                navigate("/browse");

            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");

            }
        });
        //Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [navigate, dispatch]);

    return (
        <div className='absolute z-40 w-screen px-1 md:px-8 py-2 flex justify-between flex-col md:flex-row'>
            <img src={LOGO}
                alt='logo'
                className='w-56'>
            </img>
            {user && (
                <div className='flex p-2 justify-around md:jsutify-between'>
                    {
                        isGpt && (
                            <select onChange={handleChangeLanguage} className='h-12 my-2 rounded-lg'>
                                {SUPPORTED_LANGUAGES.map(lang =>
                                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                                )}
                            </select>
                        )
                    }
                    <button onClick={handleGptSearchView} className='bg-red-700 rounded-lg py-2 px-1 md:px-4 my-2 h-12 text-white'>{isGpt ? "Home Page" : "GPT Search"}</button>
                    <img
                        alt='user-icon'
                        src={user?.photoURL}
                        className='w-12 h-12 my-2 rounded-full'>
                    </img>
                    <button onClick={handleSignOut} className='bg-red-200 py-2 px-4 h-12 my-2 rounded-lg'>
                        Sign Out
                    </button>
                </div>)}
        </div>

    )
}

export default Header
