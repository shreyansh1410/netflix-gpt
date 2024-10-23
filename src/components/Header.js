import React, { useEffect } from 'react';
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
            .then(() => {})
            .catch((error) => {
                navigate("/error");
            });
    };

    const handleGptSearchView = () => {
        dispatch(toggleGptSearchView());
    };

    const handleChangeLanguage = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate, dispatch]);

    return (
        <div className="absolute z-40 w-full px-2 md:px-8 py-4 flex justify-between items-center bg-opacity-90 bg-black shadow-md">
            <img
                src={LOGO}
                alt="logo"
                className="w-40 md:w-56 cursor-pointer"
                onClick={() => navigate('/')}
            />

            {user && (
                <div className="flex items-center space-x-4 md:space-x-6">
                    {isGpt && (
                        <select
                            onChange={handleChangeLanguage}
                            className="h-12 px-4 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-red-600"
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}
                    
                    <button
                        onClick={handleGptSearchView}
                        className="bg-red-600 hover:bg-red-700 transition-all text-white py-2 px-4 md:px-6 rounded-lg shadow-md"
                    >
                        {isGpt ? 'Home Page' : 'GPT Search'}
                    </button>

                    <img
                        alt="user-icon"
                        src={user?.photoURL}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
                    />

                    <button
                        onClick={handleSignOut}
                        className="bg-gray-200 hover:bg-gray-300 transition-all text-black py-2 px-4 md:px-6 rounded-lg shadow-md"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
