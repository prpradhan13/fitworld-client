import { useNavigate } from "react-router-dom";
import BmrImg from "../assets/bmr_img.png";

function BmrComp() {
    const navigate = useNavigate();
    
  return (
    <div className="w-full flex justify-between md:items-center py-16">
      <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
        <h1 className="text-5xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">Calculate BMR</h1>
        <p className="my-4 text-center md:text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores enim, voluptatem ipsam neque mollitia quis accusantium praesentium commodi facere aperiam?</p>
        <button type="button" onClick={() => navigate('/bmrcalcpage')} className="bg-[#ffc300] w-[200px] rounded-lg text-lg font-medium text-black py-2">
            Calculator
        </button>
      </div>

      <div className="hidden w-[40%] md:flex items-center justify-center">
        <img src={BmrImg} alt="img" className="h-[80vh]"/>
      </div>
    </div>
  )
}

export default BmrComp
