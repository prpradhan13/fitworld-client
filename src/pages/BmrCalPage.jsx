import { useState } from "react";
import toast from "react-hot-toast";

function BmrCalPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmr, setBmr] = useState(null);
  const [gainBmr, setGainBmr] = useState(null);
  const [lossBmr, setLossBmr] = useState(null);
  const [showBmr, setShowBmr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!weight || !height || !age || !gender){
        return toast.error('Please enter all fields')
    }

    // Calculate BMR
    let calculatedBmr;
    if (gender === 'male') {
        calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const weightGain = calculatedBmr + 500;
    const weightLoss = calculatedBmr - 500;

    setBmr(calculatedBmr.toFixed());
    setGainBmr(weightGain.toFixed());
    setLossBmr(weightLoss.toFixed());

    if(bmr !== null){
        setShowBmr(true);
    }
  };

  return (
    <div className="w-full h-[90vh] px-3 md:px-9 lg:px-24 py-3 md:py-6 flex flex-col gap-5 items-center">
      <h1 className="text-2xl md:text-4xl font-bold text-white">BMR Calculater</h1>
      <div className="bg-gray-900 md:w-[400px] p-5 rounded-lg">
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center justify-between">
            <label className="text-lg text-white font-semibold w-1/2">
              Body Weight (kg):
            </label>
            <input
              type="number"
              className="bg-transparent border-2 rounded-lg p-1 text-white outline-none w-1/2"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label className="text-lg text-white font-semibold w-1/2">
              Body Height (cm):
            </label>
            <input
              type="number"
              className="bg-transparent border-2 rounded-lg p-1 text-white outline-none w-1/2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label className="text-lg text-white font-semibold w-1/2">
              Age (15 to 80):
            </label>
            <input
              type="number"
              className="bg-transparent border-2 rounded-lg p-1 text-white outline-none w-1/2"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <span className="text-white text-lg font-semibold">Gender:</span>
            <div className="flex gap-2">
              <label className="text-lg text-white font-normal">Male</label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="text-lg text-white font-normal">Female</label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="bg-[#ffc300] rounded-lg py-1 text-lg font-semibold">
            Calculate
          </button>
        </form>
      </div>
      
      {showBmr && 
        <div className="bg-gray-900 w-[400px] p-5 rounded-lg">
            <h1 className="text-center text-white font-semibold text-xl">Your BMR</h1>
            <h2 className="text-center text-white font-bold text-lg">{bmr}</h2>
            <div className="flex flex-col items-center pt-4">
                <h1 className="text-white">Maintenance calory: <span>{bmr}cal</span></h1>
                <h1 className="text-white">For Gain Weight: <span>{gainBmr}cal/week</span></h1>
                <h1 className="text-white">For Gain Loss: <span>{lossBmr}cal/week</span></h1>
            </div>
        </div>
      }
    </div>
  );
}

export default BmrCalPage;
