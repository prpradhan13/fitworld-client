import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function NotLoginPopUp({setPopUp}) {
    const navigate = useNavigate();
    
  return (
    <>
      <div className="fixed w-full h-screen bg-black bg-opacity-90 flex justify-center items-center top-0 right-0 z-50 px-3">
        <div className="relative w-[400px] bg-white rounded-lg p-5">
          <button type="button" onClick={() => setPopUp(false)} className="absolute top-1 right-1">
            <IoClose className="text-black" fontSize='1.3rem' />
          </button>
          <p className="text-center font-semibold text-lg text-black">
            Login or Sign up for download workout plans.
          </p>
          <div className="w-full flex justify-center items-center pt-3">
            <button type="button" onClick={() => navigate('/login')} className="rounded-lg p-2 bg-blue-500 text-white">
                Login/Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotLoginPopUp
