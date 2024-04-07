import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import AreYouSure from "../components/AreYouSure";

const API_URL = import.meta.env.VITE_API_URL;

function AdminUsers() {
  const [allUserData, setAllUserData] = useState([]);
  const [askPopUp, setAskPopUp] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/api/auth/get-allusers`)
      const users = data.allUsers;

      if(data?.success){
        setAllUserData(users);
      }else{
        toast.error('Can not fetch users')
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  };

  useEffect(() => {
    getUsers();
  },[])

  const handleRemove = async () => {
    try {
      const {data} = await axios.delete(`${API_URL}/api/auth/delete-user/${selectedUserData._id}`);

      if(data?.success){
        toast.success('User deleted successfully');
        getUsers();
      }else{
        toast.error('User can not deleted');
      }

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
    <div className="w-full h-[90vh] px-3 md:px-9 lg:px-24 py-3 md:py-6">
      <div className="text-white">
        <h1 className="text-center text-2xl md:text-4xl font-bold">All Users</h1>
        <p className="text-center text-neutral-300">Total {allUserData.length} users</p>
        <div className="w-full flex justify-center mt-5">
          <table className="table-auto w-full">
            <thead className="">
              <tr className="md:text-xl w-full border-b">
                <th> Name </th>
                <th> Email </th>
                <th> Remove </th>
              </tr>
            </thead>
            <tbody className="">
              {allUserData.map((user) => {
                return (
                  <tr key={user._id} className="text-center border-b text-sm md:text-lg">
                    <td> {user.name} </td>
                    <td> {user.email} </td>
                    <td className="h-[7vh] flex items-center justify-center">
                      <MdDelete 
                        onClick={() => {
                          setAskPopUp(true);
                          setSelectedUserData(user)
                        }} 
                        fontSize='1.3rem' 
                        className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {askPopUp && <AreYouSure setAskPopUp={setAskPopUp} selected={selectedUserData} setSelected={setSelectedUserData} remove={handleRemove} />}
    </>
  )
}

export default AdminUsers
