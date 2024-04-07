import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import DietForm from "./DietForm";
import { IoChevronBackOutline } from "react-icons/io5";
import AreYouSure from "./AreYouSure";

const API_URL = import.meta.env.VITE_API_URL;

function AdminNutrition({setNutritionOpen}) {
  const [dietFile, setDietFile] = useState([]);
  const [dietFormOpen, setDietFormOpen] = useState(false);
  const [askPopUp, setAskPopUp] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null)

  const getAllDietFile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/diet/get-dietplan`);

      if (data?.success) {
        setDietFile(data.dietPlan);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllDietFile();
  }, []);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API_URL}/api/diet/delete-dietplan/${selectedNutrition._id}`);

      if(data?.success){
        toast.success('Successfully Deleted');
        getAllDietFile();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <div className="text-white md:px-16 lg:px-28">
      <div className="bg-gray-800 rounded-lg p-3">
        <button type="button" onClick={() => setNutritionOpen(false)} className="bg-gray-300 text-black flex items-center gap- text-lg p-2 rounded-full">
          <IoChevronBackOutline fontSize='1.3rem' />
        </button>
        <h1 className="text-center text-3xl font-bold">Nutrition</h1>
        <button type="button" onClick={() => setDietFormOpen(true)} className="text-blue-500 underline flex items-center">
          <IoCreate />
          Create a new plan
        </button>
        <div className="mt-5 flex gap-3 flex-wrap">
          {dietFile.map((items) => {
            return (
              <div
                key={items._id}
                className="border rounded-lg min-w-[250px] p-2 flex justify-between gap-5"
              >
                <h1 className="text-lg font-medium capitalize">{items.name}</h1>
                <button onClick={() => {
                  setAskPopUp(true);
                  setSelectedNutrition(items);
                }}>
                  <MdDelete fontSize='1.3rem' className="text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {dietFormOpen && <DietForm setDietFormOpen={setDietFormOpen} />}
    {askPopUp &&
      <AreYouSure
        setAskPopUp={setAskPopUp} 
        selected={selectedNutrition} 
        setSelected={setSelectedNutrition} 
        remove={handleDelete}
      />
    }
    </>
  );
}

export default AdminNutrition;
