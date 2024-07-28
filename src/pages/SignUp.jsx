import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import BtnLoading from "../components/loader/BtnLoading";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth();
    const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/signup`, {name, email, password, answer}
        );
    
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || '/');
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <>
    <div className="w-full h-[90vh] md:h-[80vh] flex justify-center items-center p-3">
        <div className="w-[400px] bg-gray-900 rounded-lg py-2 px-5">
            <h2 className="text-center text-white font-bold text-xl md:text-2xl">Sign Up</h2>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Full name:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Email:</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">Answer:</label>
                    <input 
                        type="text" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                        placeholder="Your hobby?"
                    />
                </div>
                <button 
                    type="submit"
                    className={`${isLoading ? 'bg-[#50abff] cursor-not-allowed' : 'bg-blue-500'} text-white font-semibold w-full h-[48px] py-3 rounded-xl uppercase flex justify-center items-center`}
                    disabled={isLoading}
                >
                    {isLoading ? <BtnLoading /> : "Sign Up"}
                </button>
            </form>
        </div>
    </div> 
    </>
  )
}

export default SignUp
