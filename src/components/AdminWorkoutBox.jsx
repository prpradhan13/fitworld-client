import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCreate } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import FormBox from "./FormBox";
import UpdateFormBox from "./UpdateFormBox";
import AreYouSure from "./AreYouSure";

const API_URL = import.meta.env.VITE_API_URL;

function AdminWorkoutBox() {
    const [files, setFiles] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [updateFormOpen, setUpdateFormOpen] = useState(false);
    const [updateItem, setUpdateItem] = useState();
    const [askPopUp, setAskPopUp] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    const getAllWorkout = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/file/get-fileinfo`)
          const fileData = res.data.fileInfo;
          setFiles(fileData);
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
    };
    
    useEffect(() => {
        getAllWorkout();
    },[]);

    // delete category
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${API_URL}/api/file/delete-file/${selectedWorkout._id}`);

            if(data?.success){
                toast.success('File Successfully Deleted');
                getAllWorkout();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong deleteing category");
        }
    };

  return (
    <>
    <div className="bg-gray-800 rounded-lg p-3">
      <h1 className="text-center text-3xl font-bold">Workout plans</h1>
        <p onClick={() => setFormOpen(true)} className="my-3 cursor-pointer flex items-center text-blue-500 underline justify-center">
            <IoCreate />
            Create a new plan
        </p>
        <div className="flex gap-5 flex-wrap">
            {files.map((items) => {
                return (
                    <div key={items._id} className="border min-w-[200px] rounded-lg p-2 text-lg flex justify-between gap-6">
                        <h1 className="capitalize">{items.name}</h1>
                        <div className="flex gap-5">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setUpdateFormOpen(true);
                                    setUpdateItem(items);
                                }}
                            >
                                <FaPen className="text-blue-500" />
                            </button>
                            <button
                                onClick={() => {
                                    setAskPopUp(true);
                                    setSelectedWorkout(items);
                                }}
                            >
                                <MdDelete className="text-red-500" />
                            </button>      
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
        {formOpen && <FormBox setFormOpen={setFormOpen}/>}
        {updateFormOpen && <UpdateFormBox setUpdateFormOpen={setUpdateFormOpen} updateItem={updateItem}/>}
        {askPopUp &&
            <AreYouSure
                setAskPopUp={setAskPopUp} 
                selected={selectedWorkout} 
                setSelected={setSelectedWorkout} 
                remove={handleDelete}
            />
        }
    </>
  )
}

export default AdminWorkoutBox
