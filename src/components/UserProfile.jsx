import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/authContext";

function UserProfile({setUserProfile}) {
    const [auth] = useAuth();

  return (
    <div className="fixed w-[250px] h-screen p-3 bg-gray-700 top-0 right-0">
      <button type="button" onClick={() => setUserProfile(false)} className="">
        <IoClose fontSize='1.5rem'/>
      </button>
      <h1 className="text-center font-bold text-xl md:text-2xl border-b-2 text-white">User Profile</h1>
      <h2 className="my-3 font-medium text-white capitalize"> Name: {auth?.user.name}</h2>
      <h2 className="my-3 font-medium text-white capitalize flex flex-wrap"> Email: {auth?.user.email}</h2>
    </div>
  )
}

export default UserProfile
