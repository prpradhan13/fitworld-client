import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import UserProfile from "./UserProfile";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [opneUserProfile, setUserProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate('/login');
    toast.success("Logged out successfully");
  };

  return (
    <>
    <nav className="w-full px-3 md:px-9 lg:px-24 py-3 md:py-6 flex justify-between items-center">
      <Link to={'/'}>
        <h1 className="text-white text-xl md:text-2xl font-bold">fit<span className="text-blue-500 text-2xl md:text-3xl">World.</span></h1>
      </Link>

      <button type="button" onClick={() => setMenuOpen(true)} className="text-white md:hidden">
        <IoMenu fontSize='1.8rem'/>
      </button>

      {menuOpen && 
        <div className="h-screen w-full fixed top-0 right-0 bg-black">
          <IoClose onClick={() => setMenuOpen(false)} className="text-white absolute right-3 top-3" fontSize='2.3rem'/>
          <div className="h-screen w-full flex justify-center items-center">
            <div onClick={() => setMenuOpen(false)} className="text-white flex flex-col gap-5 items-center text-2xl font-semibold">
              <Link to={'/about'}>About</Link>
              <Link to={'/allworkout'}>Workout</Link>
              <Link to={'/allnutrition'}>Nutrition</Link>
              <Link to={'/bmrcalcpage'}>BMR</Link>
                {!auth.user ? <>
                  <button type="button" className="bg-blue-500 px-3 py-1 rounded-lg">
                    <Link to={'/login'}>Login</Link>
                  </button>
                  <button type="button" className="bg-blue-500 px-3 py-1 rounded-lg">
                    <Link to={'/signup'}>Sign Up</Link>
                  </button>
                </> : <>
                  {auth.user.role === 1 ? <>
                    <button type="button" onClick={() => navigate('/admin/admindashboard')} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                      Admin
                    </button>
                    <button type="button" onClick={handleLogout} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                      Logout
                    </button>
                  </> : <>
                    <button type="button" onClick={() => setUserProfile(true)} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                      Profile
                    </button>
                    <button type="button" onClick={handleLogout} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                      Logout
                    </button>
                  </>}
                </>}
            </div>
          </div>
        </div>
      }

      <div className="hidden text-white md:flex items-center gap-5 font-semibold text-base">
        <NavLink to={'/about'} className={({isActive}) => `${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`}>About</NavLink>
        <NavLink to={'/allworkout'} className={({isActive}) => `${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`}>Workout</NavLink>
        <NavLink to={'/allnutrition'} className={({isActive}) => `${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`}>Nutrition</NavLink>
        <NavLink to={'/bmrcalcpage'} className={({isActive}) => `${isActive ? "text-blue-500" : "text-white"} hover:text-blue-500`}>BMR</NavLink>

        <div className="flex gap-5">
          {!auth.user ? <>
            <button type="button" className="bg-blue-500 px-3 py-1 rounded-lg">
              <Link to={'/login'}>Login</Link>
            </button>
            <button type="button" className="bg-blue-500 px-3 py-1 rounded-lg">
              <Link to={'/signup'}>Sign Up</Link>
            </button>
          </> : <>
            {auth.user.role === 1 ? <>
              <button type="button" onClick={() => navigate('/admin/admindashboard')} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                Admin
              </button>
              <button type="button" onClick={handleLogout} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                Logout
              </button>
            </> : <>
              <button type="button" onClick={() => setUserProfile(true)} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                Profile
              </button>
              <button type="button" onClick={handleLogout} className="border px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500">
                Logout
              </button>
            </>}
          </>}
        </div>
      </div>
    </nav>

    {opneUserProfile && <UserProfile setUserProfile={setUserProfile} />}
    </>
  )
}

export default Navbar
