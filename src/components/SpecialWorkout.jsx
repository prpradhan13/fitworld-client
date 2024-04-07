import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import NotLoginPopUp from "../components/NotLoginPopUp";
import { useAuth } from "../context/authContext";

const API_URL = import.meta.env.VITE_API_URL;

function SpecialWorkout() {
    const [specialWorkout, setSpecialWorkout] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [auth] = useAuth();

    const getSpecialWorkout = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/api/file/get-fileinfo`);
            const filteredData = data.fileInfo.filter((items) => items.isSpecial === true);

            if(data?.success){
                setSpecialWorkout(filteredData);
            }else{
                toast.error('Failed to get file')
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getSpecialWorkout();
    },[])

    const handleView = async (fileId) => {
        try {
          const res = await axios.get(`${API_URL}/api/file/get-file/${fileId}`, {
            responseType: 'arraybuffer',
          });
    
          const blob = new Blob([res.data], {type: 'application/pdf'});
    
          const url = URL.createObjectURL(blob);
    
          window.open(url, '_blank');
    
          // Cleanup
          URL.revokeObjectURL(url);

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const handleDownload = async (fileId, fileName) => {
        try {
          if(auth.user === null){
            return setPopUp(true);
          }
          
          const res = await axios.get(`${API_URL}/api/file/get-file/${fileId}`, {
            responseType: 'arraybuffer',
          });
    
          const blob = new Blob([res.data], {type: 'application/pdf'});
    
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
    
          // Cleanup
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
    
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong');
        }
    };

  return (
    <>
    <div className="w-full min-h-[70vh] flex flex-col items-center py-5 justify-center bg-black bg-grid-white/[0.2] relative ">
    <div className="hidden md:flex absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
        <h1 className="text-3xl md:text-5xl pb-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold">
            Train Like A Champion
        </h1>
        <p className="text-neutral-300 text-center max-w-full md:max-w-lg">
            If your muscles stop growing, then follow these Champion level workouts.
        </p>
        <div className="py-9 px-5 flex gap-4 flex-wrap">
            {specialWorkout.map((items) => {
                return (
                    <div key={items._id} className="bg-gray-800 w-full min-h-[200px] md:w-[300px] rounded-lg p-3 flex flex-col gap-3 justify-between">
                        <h1 className="text-xl font-semibold">{items.name}</h1>
                        <p className="text-neutral-400"> {items.description} </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleView(items._id)}
                                className="w-[50%] bg-blue-500 rounded-lg py-1 font-medium"
                            >
                                View
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDownload(items._id, items.name)}
                                className="w-[50%] bg-green-500 rounded-lg py-1 font-medium"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>

    { popUp && <NotLoginPopUp setPopUp={setPopUp} />}
    </>
  )
}

export default SpecialWorkout
