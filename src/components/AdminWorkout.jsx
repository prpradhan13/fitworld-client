import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Select } from "antd";
import AdminWorkoutBox from "./AdminWorkoutBox";
import AreYouSure from "./AreYouSure";

const { Option } = Select;
const API_URL = import.meta.env.VITE_API_URL;

function AdminWorkout() {
    const [category, setCategory] = useState([]);
    const [updateFormOpen, setUpdateFormOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [isFeatured, setIsFeatured] = useState();
    const [askPopUp, setAskPopUp] = useState(false);


    const getCategory = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/api/category/allcategory`)
            const categoryData = data.category;
            setCategory(categoryData);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    useEffect(() => {
        getCategory();
    },[]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}/api/category/create-category`, {name})

            if (data?.success) {
                toast.success(`${name} is created`);
                getCategory();
              } else {
                toast.error(data.message);
              }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${API_URL}/api/category/update-category/${selected._id}`,
                { name: updatedName, isFeatured }
              );
        
              if(data?.success){
                toast.success(`${updatedName} successfully updated`);
                setSelected(null);
                setUpdatedName("")
                setUpdateFormOpen(false);
                getCategory();
              }else{
                toast.error(data.message);
              }
        } catch (error) {
            console.log(error);
            toast.error('Error updating');
        }
    };

    // delete category
    const handleDelete = async () => {
        try {
        const { data } = await axios.delete(`${API_URL}/api/category/deletecategory/${selected._id}`);

        if(data.success){
            toast.success('Category Successfully Deleted');
            getCategory();
        }else{
            toast.error(data.message);
        }

        } catch (error) {
        toast.error("Something went wrong deleteing category");
        }
    };

  return (
    <>
    <div className='text-white md:px-16 lg:px-28'>
      <div className="flex flex-col gap-6 bg-gray-800 rounded-lg p-3">
        <h1 className="text-center text-3xl font-bold">Category</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-5">
            <div>
                {category.map((items) => {
                    return (
                        <div key={items._id} className="capitalize flex items-center gap-8 text-xl mb-2 font-medium">
                            <button
                                onClick={() => {
                                    setAskPopUp(true);
                                    setSelected(items);
                                }}
                            >
                                <MdDelete className="text-red-500" />
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setUpdateFormOpen(true);
                                    setUpdatedName(items.name);
                                    setSelected(items)
                                }}
                            >
                                <FaPen className="text-blue-500" />
                            </button>
                            {items.name}
                        </div>
                    )
                })}
            </div>
            <div>
                {updateFormOpen ? <>
                    <form className="" onSubmit={handleUpdate}>
                        <div className="flex flex-col gap-3">
                            <input 
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                className="bg-transparent outline-none border rounded-lg py-1 px-2"
                            />
                            <Select 
                                variant="false"
                                placeholder="Select Featured"
                                size="large"
                                showSearch
                                onChange={(value) => {
                                  setIsFeatured(value);
                                }}
                                className="bg-gray-500 outline-none border rounded-lg py-1 px-2 text-white"
                            >
                                <Option value="false"> No </Option>
                                <Option value="true"> Yes </Option>
                            </Select>
                        </div>
                        <button type="submit" className="bg-blue-500 mt-2 rounded-lg py-2 px-4 font-semibold">
                            Update
                        </button>
                    </form>
                </> : <>
                    <form className="border rounded-lg py-1 px-2 flex justify-between" onSubmit={handleAdd}>
                        <input 
                            type="text"
                            placeholder="Enter category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent outline-none"
                        />
                        <button type="submit" className="bg-blue-500 rounded-lg py-2 px-4 font-semibold">
                            Add
                        </button>
                    </form>
                </>}
            </div>
        </div>
      </div>

      <div className="mt-10">
            <AdminWorkoutBox />                
      </div>
    </div>

    {askPopUp && 
        <AreYouSure
            setAskPopUp={setAskPopUp} 
            selected={selected} 
            setSelected={setSelected} 
            remove={handleDelete} 
        />
    }
    </>
  )
}

export default AdminWorkout
