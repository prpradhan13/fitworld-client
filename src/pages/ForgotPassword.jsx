import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {email, answer, newPassword}
            );
        
            navigate('/login')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
      };

  return (
    <div className="w-full h-[90vh] md:h-[80vh] flex justify-center items-center p-3">
        <div className="w-[400px] bg-gray-900 rounded-lg py-2 px-5">
            <h2 className="text-center text-white font-bold text-xl md:text-2xl">Forgot Password</h2>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
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
                    <label className="text-white text-lg font-semibold">Answer?</label>
                    <input 
                        type="text"
                        value={answer}
                        placeholder="Your hobby?"
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white text-lg font-semibold">New Password:</label>
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border outline-none bg-transparent rounded-lg p-1 text-white"
                    />
                </div>
                <button type="submit" className="bg-blue-500 rounded-lg my-2 p-2 font-semibold text-white">
                    Submit
                </button>
            </form>
        </div>
    </div> 
  )
}

export default ForgotPassword
