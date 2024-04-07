import toast from 'react-hot-toast';
import { useSearch } from '../context/searchContext';
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Spotlight} from "../components/ui/Spotlight"

function HeroSection() {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/file/search/${values.keyword}`)
      setValues({...values, results: data});
      navigate("/search");
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while seacrh')
    }
  };

  return (
    <>
    <div className="h-[90vh] w-full flex flex-col justify-center items-center p-3">
      <Spotlight
        className="-top-20 left-10 md:left-60 md:-top-20"
        fill="white"
      />
        <h2 className="text-white text-xl md:text-2xl font-semibold">Welcome to fit<span className="text-blue-500">World.</span></h2>
        <h1 className="text-4xl md:text-7xl pb-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 font-extrabold">Shape Your Future</h1>
        <p className="text-neutral-300 text-sm md:text-base text-center max-w-full md:max-w-lg">When you can control your brain, you can control your body. Join with us and unlease your strenght.</p>
        <div className='mt-5 border p-1 w-[300px] rounded-full overflow-hidden'>
          <form onSubmit={handleSubmit} className='flex justify-between'>
            <input 
              type="text"
              placeholder='Quick search...'
              value={values.keyword}
              onChange={(e) => setValues({...values, keyword: e.target.value})}
              className="bg-transparent px-2 text-white outline-none"
            />
            <button type='submit' className='bg-blue-500 rounded-full p-1'>
              <IoSearch fontSize='1.3rem' />
            </button>
          </form>
        </div>
    </div> 
    </>
  )
}

export default HeroSection
