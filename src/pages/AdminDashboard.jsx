import { useState } from "react";
import { useAuth } from "../context/authContext"
import AdminNutrition from "../components/AdminNutrition";
import AdminWorkout from "../components/AdminWorkout";
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const [auth] = useAuth();
  const [nutritionOpen, setNutritionOpen] = useState(false);

  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-[90vh] px-3 md:px-9 lg:px-24 py-3 md:py-6 flex flex-col md:flex-row">
      <div className="text-white w-full md:w-[20%] p-5 md:p-0">
        <h1 className="border-b-2 pb-1 text-center text-xl font-semibold">Admin Profile</h1>
        <h2 className="capitalize mt-2 text-lg">Name: {auth?.user.name}</h2>
        <h2 className="text-lg">Email: {auth?.user.email}</h2>
        <div className="flex md:flex-col justify-between gap-3 mt-3">
          <button type="button" onClick={() => navigate('/admin/adminusers')} className="border w-1/2 md:w-full rounded-lg text-lg p-2 hover:bg-blue-500">
            Users
          </button>
          <button type="button" onClick={() => setNutritionOpen(true)} className="border w-1/2 md:w-full rounded-lg text-lg p-2 hover:bg-blue-500">
            Nutrition
          </button>
        </div>
      </div>

      <div className="w-full md:w-[80%]">
        {nutritionOpen ? <>
          <AdminNutrition setNutritionOpen={setNutritionOpen} />
        </> : <>
          <AdminWorkout />
        </>}
      </div>
    </div>
  )
}

export default AdminDashboard
