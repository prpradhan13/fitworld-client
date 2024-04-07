import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


function SingleDietPage() {
    const [dietPlan, setDietPlan] = useState({});
    const [plan, setPlan] = useState([]); //dietPlan is an object, plan is an array which present in the dietPlan.

    const params = useParams();

    const getSinglePlan = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/diet/get-dietplan/${params.id}`)
            if(data?.success){
                setDietPlan(data.dietPlan);
                setPlan(data.dietPlan.plan);
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not get plan')
        }
    };

    useEffect(() => {
        getSinglePlan();
        // eslint-disable-next-line
    },[params?.id]);

    const total = plan.reduce((acc, items) => {
      acc.totalCalories += items.calories || 0;
      acc.totalProtien += items.protien || 0;
      acc.totalCarbohydrate += items.carbs || 0;
      acc.totalFats += items.fat || 0;
      return acc;
    }, { totalProtien: 0, totalCalories: 0, totalCarbohydrate: 0, totalFats: 0 })

  return (
    <div className="text-white w-full min-h-screen px-3 md:px-9 lg:px-24 py-3 md:py-6 flex flex-col gap-4">
      <h1 className="text-center text-3xl font-extrabold capitalize">{dietPlan.name}</h1>
      <p className="text-[#ffc300] text-base">Description: <span className="text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi asperiores nobis ullam quo id enim sequi, atque tempora minima assumenda.</span></p>
      <div className="">
        <h1 className="text-[#ffc300] text-xl font-bold">Total Macros:</h1>
        <h2 className="text-lg">Calories: {total.totalCalories}</h2>
        <h2 className="text-lg">Protien: {total.totalProtien}</h2>
        <h2 className="text-lg">Cabohydrate: {total.totalCarbohydrate}</h2>
        <h2 className="text-lg">Fats: {total.totalFats}</h2>
      </div>
      <h1 className="text-center text-2xl font-bold">Diet Plan</h1>
      <div className="border rounded-lg py-2 px-4 flex flex-col gap-3">
        {plan.map((items, i) => {
          return (
            <div key={i} className="">
              <div className="">
                <h2 className="text-[#ffc300] text-lg capitalize font-semibold">{items.mealName}</h2>
                <h2 className="text-neutral-400">Food: <span className="text-white">{items.food}</span></h2>
                <h2 className="text-neutral-400">Calories: <span className="text-white">{items.calories}</span></h2>
                <h2 className="text-neutral-400">Protien: <span className="text-white">{items.protien}</span></h2>
                <h2 className="text-neutral-400">Carbohydrate: <span className="text-white">{items.carbs}</span></h2>
                <h2 className="text-neutral-400">Fat: <span className="text-white">{items.fat}</span></h2>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleDietPage
