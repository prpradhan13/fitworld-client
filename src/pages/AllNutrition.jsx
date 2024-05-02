import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { IoIosArrowRoundUp } from "react-icons/io";
import BoxSkeleton from "../components/skeleton/BoxSkeleton";

const API_URL = import.meta.env.VITE_API_URL;

function AllNutrition() {
  const [allNutrition, setAllNutrition] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAllNutrition = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/api/diet/get-dietplan`)
      if(data?.success){
        setAllNutrition(data.dietPlan);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error('Could not get plans')
    }
  };

  useEffect(() => {
    getAllNutrition()
  },[]);

  return (
    <>
    <div className="w-full h-screen px-3 md:px-9 lg:px-24 py-3 md:py-6">
      <h1 className="text-white text-center text-3xl font-bold">All Diet Plans</h1>
      <p className="text-white text-center text-base">{loading ? "Please wait..." : `Total ${allNutrition.length} Plans`}</p>
      <div className="flex gap-5 flex-wrap mt-9 justify-center md:justify-start">
        {loading ? <BoxSkeleton /> : <>
          {allNutrition.map((items) => {
            return (
              <div key={items._id} className="min-w-[300px] border-2 rounded-lg text-lg font-medium capitalize text-white p-2 cursor-pointer flex gap-6 justify-between items-center">
                {items.name}
                <button type="button" onClick={() => navigate(`/singledietpage/${items._id}`)} className="rounded-full bg-[#ffc300] p-1">
                  <IoIosArrowRoundUp className="text-black rotate-45" fontSize='1.6rem' />
                </button>
              </div>
            )
          })}
        </>}
      </div>
    </div> 
    </>
  )
}

export default AllNutrition
