import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleAiSearchView } from "../utils/aiSearchSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const aiSearch = useSelector((store) => store.aiSearch);
  const isAiSearch = aiSearch.showAiSearch;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
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
    <header className="fixed w-full z-50 bg-gradient-to-b from-black/90 to-black/0 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <img
            src={LOGO}
            alt="logo"
            className="w-24 md:w-36 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {user && (
            <div className="flex items-center gap-4">
              {isAiSearch && (
                <select
                  onChange={(e) => dispatch(changeLanguage(e.target.value))}
                  className="h-10 px-3 rounded-lg bg-black/50 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={() => dispatch(toggleAiSearchView())}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
              >
                {isAiSearch ? "Home" : "AI Search"}
              </button>

              <div className="flex items-center gap-3">
                <img
                  alt="user-icon"
                  src={user?.photoURL}
                  className="w-10 h-10 rounded-full ring-2 ring-red-500 transition-transform hover:scale-110"
                />
                <button
                  onClick={() => signOut(auth)}
                  className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg border border-gray-600 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;