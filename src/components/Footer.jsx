import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

function Footer() {
  const years = new Date().getFullYear();

  return (
    <>
    <div className="w-full px-2 md:px-9 lg:px-24 py-6 bg-[#111111] flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-between text-white gap-6 px-5 md:px-0">
        <div className="">
          <h1 className="text-lg font-medium border-b-2 w-[50px] whitespace-nowrap border-blue-500">Our Services</h1>
          <div className="mt-2">
            <h2>Workout</h2>
            <h2>Nutrition</h2>
            <h2>Special Workouts</h2>
            <h2>Costomise</h2>
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-medium border-b-2 w-[50px] whitespace-nowrap border-blue-500">Company</h1>
          <div className="mt-2">
            <h2>About</h2>
            <h2>Privacy policy</h2>
            <h2>Terms Condition</h2>
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-medium border-b-2 w-[50px] whitespace-nowrap border-blue-500">Support</h1>
          <div className="mt-2">
            <h2>Contact Us</h2>
            <h2>Nutrition</h2>
            <h2>Special Workouts</h2>
            <h2>Costomise</h2>
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-medium border-b-2 w-[50px] whitespace-nowrap border-blue-500">Our Social</h1>
          <div className="flex gap-3 mt-2">
            <FaTwitter className="text-blue-600" fontSize='1.3rem'/>
            <FaInstagram className="text-purple-500" fontSize='1.3rem'/>
            <FaFacebookF className="text-blue-400" fontSize='1.3rem'/>
            <FaYoutube className="text-red-500" fontSize='1.3rem' />
          </div>
        </div>
      </div>
      <p className=" text-center text-white mt-8">© right FitWorld {years}</p>
    </div>
    </>
  )
}

export default Footer
