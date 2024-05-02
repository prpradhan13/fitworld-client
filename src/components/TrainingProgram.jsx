import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "./Card";
import { BackgroundGradient } from "../components/ui/background-gradient";
import HomeSkeleton from "./skeleton/HomeSkeleton";

function TrainingProgram() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/category/allcategory`
      );
      const categoryData = data.category.filter(
        (item) => item.isFeatured === true
      );
      setCategory(categoryData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 justify-center mt-5">
      <h1 className="text-3xl md:text-5xl pb-3 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold">
        Discover Your Strength
      </h1>
      <p className="text-neutral-300 text-center text-sm md:text-base max-w-full md:max-w-lg">
        Choose a workout program and unlease your strength. Any one can follow these program.
      </p>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 pt-10">
        {loading ? <HomeSkeleton /> : <>
          {category.map((items) => {
            return (
              <div key={items._id}>
              <BackgroundGradient
                className="min-w-[340px] bg-gray-900 rounded-[22px] py-3"
              >
                <h1 className="text-2xl capitalize text-center font-semibold">
                  {items.name}
                </h1>
                <Card categoryName={items.name} />
              </BackgroundGradient>
              </div>
            );
          })}
        </>}
      </div>
    </div>
  );
}

export default TrainingProgram;
