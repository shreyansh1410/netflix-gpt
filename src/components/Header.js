import React from 'react'
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () =>{
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    return (
        <div className='absolute z-30 w-full px-8 py-3 saturate-200 flex justify-between'>
            <img src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
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
