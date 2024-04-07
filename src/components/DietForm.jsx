import { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function DietForm({setDietFormOpen}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isFeatured: false,
    plan: [
      {
        mealName: "",
        food: "",
        calories: 0,
        protein: 0,
        carbohydrate: 0,
        fats: 0,
      },
    ],
  });

  const handlePlanChange = (index, event) => {
    const updatedPlan = formData.plan.map((item, i) => {
        if (index === i) {
            return { ...item, [event.target.name]: event.target.value };
        } else {
            return item;
        }
    });

    setFormData({ ...formData, plan: updatedPlan });
};

const addPlanItem = () => {
    setFormData({
        ...formData,
        plan: [...formData.plan, { mealName: '', food: '', calories: 0, protein: 0, carbs: 0, fats: 0 }],
    });
};

const removePlanItem = (index) => {
    setFormData({
        ...formData,
        plan: formData.plan.filter((_, i) => i !== index),
    });
};

// Handling changes to the other form fields
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
    });
};

// Just a placeholder submit function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(`${API_URL}/api/diet/create-dietplan`, formData);
        
        if(data?.success){
            toast.success('Created Successfully');
            setDietFormOpen(false);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
    }
};

  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-90 top-0 left-0 flex items-center justify-center px-3">
      <div className="w-full lg:w-[60%] max-h-[85vh] bg-gray-800 relative overflow-auto rounded-lg">
        <button type="button" onClick={() => setDietFormOpen(false)}>
            <IoClose fontSize='1.6rem' className="absolute right-2 top-2 text-white"/>
        </button>
        <h1 className="text-xl font-bold text-center text-white">
            Create Diet Plan
        </h1>
        <form className="p-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label className="text-white font-medium"> Plan name: </label>
                <input
                    type="text"
                    name="name"
                    className="bg-[#4b5563] text-white rounded-lg py-1 px-2 outline-none"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-white font-medium"> Description: </label>
                <input
                    type="text"
                    name="description"
                    className="bg-[#4b5563] text-white rounded-lg py-1 px-2 outline-none"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-white font-medium"> IsFeatured: </label>
                <input
                    type="text"
                    placeholder="true or false?" 
                    name="isFeatured"
                    className="bg-[#4b5563] text-white rounded-lg py-1 px-2 outline-none"
                    
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <h2 className="text-white font-medium">Diet chat</h2>
                {formData.plan.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-1 h-[10vh] md:h-8 overflow-auto bg-gray-400 p-1 md:p-0 md:bg-transparent rounded-lg">
                        <input
                            type="text"
                            name="mealName"
                            placeholder="Meal Name"
                            value={item.mealName}
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg py-1 px-2 outline-none"
                        />
                        <input
                            type="text"
                            name="food"
                            placeholder="Foods"
                            value={item.food}
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg py-1 px-2 outline-none"
                        />
                        <input
                            type="number"
                            name="calories"
                            placeholder="Calories"
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg p-1 outline-none max-w-20"
                        />
                        <input
                            type="number"
                            name="protien"
                            placeholder="Protien"
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg p-1 outline-none max-w-20"
                        />
                        <input
                            type="number"
                            name="carbs"
                            placeholder="Carbs"
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg p-1 outline-none max-w-16"
                        />
                        <input
                            type="number"
                            name="fat"
                            placeholder="Fat"
                            onChange={(e) => handlePlanChange(index, e)}
                            className="bg-[#4b5563] text-white rounded-lg p-1 outline-none max-w-16"
                        />
                        {/* Inputs for food, calories, protein, carbohydrate, fats */}
                        <button type="button" onClick={() => removePlanItem(index)} className="bg-red-500 rounded-lg px-2">
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addPlanItem} className="underline text-green-500 p-2">
                    Add Meal Plan
                </button>
            </div>
            <div className="flex justify-center w-full my-4">
                <button type="submit" className="bg-blue-500 w-[200px] rounded-lg text-white p-2">Create</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default DietForm;
