import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa6";
import {useAuth} from "../context/authContext";
import NotLoginPopUp from "../components/NotLoginPopUp";

const API_URL = import.meta.env.VITE_API_URL;

function AllWorkout() {
  const [allWorkout, setAllWorkout] = useState([]);
  const [auth] = useAuth();
  const [popUp, setPopUp] = useState(false);

  const getAllWorkout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/file/get-fileinfo`)
      const fileData = res.data.fileInfo;
      setAllWorkout(fileData);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  };

  useEffect(() => {
    getAllWorkout();
  },[]);

  const handleDownload = async (fileId, fileName) => {
    try {
      if(auth.user === null){
        return setPopUp(true);
      }
      // make a request to the server to fetch the file data
      const res = await axios.get(`${API_URL}/api/file/get-file/${fileId}`, {
        responseType: 'arraybuffer',
      });

      // create a blob from the file data with content type 'application/pdf'
      const blob = new Blob([res.data], {type: 'application/pdf'});

      // create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Set the filename
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
    <div className="w-full min-h-[90vh] px-3 md:px-9 lg:px-24 py-3 md:py-6">
      <h1 className="text-white text-center font-bold text-3xl">All Workout</h1>
      <p className="text-white text-center text-base">Total {allWorkout.length} Plans</p>
      <div className="w-full flex gap-3 flex-wrap mt-9 justify-center md:justify-start">
        {allWorkout.map((items) => {
          return (
            <div key={items._id} className="group/item min-w-[300px] flex items-center gap-8 justify-between text-white capitalize border-2 rounded-lg p-2 text-lg font-semibold">
              {items.name}
              <button type="button" onClick={() => handleDownload(items._id, items.name)} className="bg-green-500 rounded-full p-2 group-hover/item:animate-bounce">
                <FaArrowDown />
              </button>
            </div>
          )
        })
        }
      </div>
    </div>

    { popUp && <NotLoginPopUp setPopUp={setPopUp}/> }
    </>
  )
}

export default AllWorkout
