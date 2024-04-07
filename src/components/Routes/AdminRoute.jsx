import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from 'react-router-dom';
import axios from "axios";
import Loading from "../Loading";

export default function AdminRoute(){
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admin-auth`)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/> : <Loading path="/login" />
}