import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Meteors } from "../components/ui/meteors";

function NutritionPoint() {
  const [nutrition, setNutrition] = useState([]);

  const navigate = useNavigate();

  const getNutrtion = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/diet/get-dietplan`
      );
      if (data?.success) {
        setNutrition(data.dietPlan);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't get information");
    }
  };

  useEffect(() => {
    getNutrtion();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-16">
      <h1 className="text-3xl md:text-5xl pb-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 font-bold">
        Nutrition Point
      </h1>
      <p className="text-neutral-300 text-sm md:text-base text-center max-w-full md:max-w-lg">
        For a perfect body or growing muscles, a good diet plan is very important. Eat clean and healthy foods.
      </p>
      <div className="flex flex-col md:flex-row gap-5 pt-10">
        {nutrition.map((items) => {
          return (
            <div
              key={items._id}
              onClick={() => navigate(`/singledietpage/${items._id}`)}
              className="relative overflow-hidden cursor-pointer border-2 rounded-lg h-[30vh] flex items-center justify-center min-w-[230px] text-xl font-medium capitalize bg-gray-900"
            >
              {items.name}
              <Meteors number={20} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NutritionPoint;
