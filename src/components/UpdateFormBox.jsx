import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const { Option } = Select;
const API_URL = import.meta.env.VITE_API_URL;

function UpdateFormBox({ setUpdateFormOpen, updateItem }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isFeatured, setIsFeatured] = useState();
    const [isSpecial, setIsSpecial] = useState();
    const [file, setFile] = useState("");
    const [allCategory, setAllCategory] = useState([]);

    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/api/category/allcategory`)
            const categoryData = data.category;
            setAllCategory(categoryData);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const fileData = new FormData();
            fileData.append("name", name);
            fileData.append("description", description);
            fileData.append("category", category);
            fileData.append("isFeatured", isFeatured);
            fileData.append("isSpecial", isSpecial);
            file && fileData.append("file", file);

            const { data } = await axios.put(`${API_URL}/api/file/update-file/${updateItem._id}`, fileData);
            if(data?.success){
                toast.success("Product created successfully")
                setUpdateFormOpen(false);
              }else{
                toast.error("Product creation failed")
              }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

  return (
    <div className="fixed bg-black bg-opacity-90 w-[100vw] h-screen left-0 top-0 flex justify-center items-center">
      <div className="bg-gray-900 w-[400px] min-h-[500px] relative rounded-lg">
        <button type="button" onClick={() => setUpdateFormOpen(false)}>
            <IoClose fontSize='1.6rem' className="absolute right-2 top-2"/>
        </button>
        <h1 className="text-center font-bold text-2xl"> Update plan </h1>
        <form className="p-4 flex flex-col gap-2" onSubmit={handleUpdate}>
            <div className="flex flex-col">
                <label>Workout name</label>
                <input 
                    type="text"
                    placeholder={updateItem.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border rounded-lg p-1"
                />
            </div>
            <div className="flex flex-col">
                <label>Description</label>
                <textarea 
                    type="text"
                    placeholder={updateItem.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-transparent border rounded-lg p-1"
                />
            </div>
            <div className="flex flex-col">
                <label>Category</label>
                <Select 
                    variant="false"
                    placeholder={updateItem.category.name}
                    size="large"
                    showSearch
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    className="bg-gray-600 rounded-lg text-whit placeholder:text-white"
                >
                    {allCategory?.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="flex flex-col">
                <label>IsFeatured?</label>
                <Select 
                    variant="false"
                    placeholder="IsFeatured"
                    size="large"
                    showSearch
                    onChange={(value) => {
                        setIsFeatured(value);
                    }}
                    className="bg-gray-600 rounded-lg text-white"
                >
                    <Option value="false"> No </Option>
                    <Option value="true"> Yes </Option>
                </Select>
            </div>
            <div className="flex flex-col">
                <label>IsSpecial?</label>
                <Select 
                    variant="false"
                    placeholder="IsSpecial"
                    size="large"
                    showSearch
                    onChange={(value) => {
                        setIsSpecial(value);
                    }}
                    className="bg-gray-600 rounded-lg text-white"
                >
                    <Option value="false"> No </Option>
                    <Option value="true"> Yes </Option>
                </Select>
            </div>
            <div className="flex flex-col">
                <label>File (pdf only)</label>
                <input 
                    type="file"
                    name="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="bg-transparent border rounded-lg p-1 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
            </div>

            <button type="submit" className="bg-blue-500 rounded-lg text-lg font-semibold py-1 my-2">
                Update
            </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateFormBox
