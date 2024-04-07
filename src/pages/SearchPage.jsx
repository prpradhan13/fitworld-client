import axios from "axios";
import { useSearch } from "../context/searchContext";
import { FaArrowDown } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import NotLoginPopUp from "../components/NotLoginPopUp";

function SearchPage() {
    const [values] = useSearch();
    const [auth] = useAuth();
    const [popUp, setPopUp] = useState(false);

    const handleDownload = async (fileId, fileName) => {
        try {
          if(auth.user === null){
            return setPopUp(true);
          }
          
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/file/get-file/${fileId}`, {
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
    <div className="w-full h-screen text-white px-3 md:px-9 lg:px-24 py-3 md:py-6">
        {values.results.length < 1 ? <>
            <h1 className="text-center text-5xl font-semibold mt-16">Opps! there is no such file available.</h1>
        </> : <>
            <h2 className="text-center text-lg">
                {values.results.length} workout plan found
            </h2>
        </>}
        
        <div className="flex justify-center md:justify-start flex-wrap gap-5 mt-8">
            {values.results.map((items) => {
                return (
                    <div key={items._id} className="border-2 p-2 rounded-lg flex items-center min-w-[300px] justify-between gap-5">
                        <h2 className="capitalize">{items.name}</h2>
                        <button type="button" onClick={() => handleDownload(items._id, items.name)} className="bg-green-500 rounded-full p-2 group-hover/item:animate-bounce">
                            <FaArrowDown />
                        </button>
                    </div>
                )
            })}
        </div>
    </div>

    { popUp && <NotLoginPopUp setPopUp={setPopUp}/> }
    </>
  )
}

export default SearchPage
