import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleSignOut = () =>{
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {           //writing in useEffect coz we only have to do this only once
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const {uid, email, displayName, photoURL} = user;
                dispatch(
                    addUser({
                    uid:uid,
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
        <div className='absolute z-30 w-full px-8 py-3 saturate-200 flex justify-between'>
            <img src={LOGO}
                alt='logo'
                className='w-56'>
            </img>
            {user && (
                <div className='flex p-2'>
                <img
                    alt='user-icon'
                    src={user?.photoURL}
                    className='w-12 h-12'>
                </img>
                <button onClick={handleSignOut} className='bg-green-200 h-12 w-20'>
                    Sign Out
                </button>
            </div>)}
        </div>

    )
}

export default Header
