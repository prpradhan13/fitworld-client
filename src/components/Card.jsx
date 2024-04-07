import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaArrowDown } from "react-icons/fa6";
import { useAuth } from "../context/authContext";
import NotLoginPopUp from "../components/NotLoginPopUp";

const API_URL = import.meta.env.VITE_API_URL;

function Card({categoryName}) {
    const [files, setFiles] = useState([]);
    const [auth] = useAuth();
    const [popUp, setPopUp] = useState(false);

    const getFiles = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/api/file/get-fileinfo`)
            const fileData = data.fileInfo
            const filteredData = fileData.filter((item) => item.category.name === categoryName && item.isFeatured === true)
            setFiles(filteredData);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    useEffect(() => {
        getFiles();
        // eslint-disable-next-line
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
    <div className="p-3 flex flex-col gap-3">
      {files.map((items) => {
        return (
            <div key={items._id} className="group/item flex items-center gap-5 justify-between border-2 p-3 capitalize rounded-lg text-xl font-medium">
                {items.name}
                <button type="button" onClick={() => handleDownload(items._id, items.name)} className="bg-green-500 rounded-full p-2 group-hover/item:animate-bounce">
                    <FaArrowDown />
                </button>
            </div>
        )
      })}
    </div>

    { popUp && <NotLoginPopUp setPopUp={setPopUp} />}
    </>
  )
}

export default Card
