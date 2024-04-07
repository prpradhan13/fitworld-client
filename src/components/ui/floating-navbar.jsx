import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate('/login');
    toast.success("Logged out successfully");
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed max-w-fit mx-auto top-10 inset-x-0 rounded-full border bg-black z-[5000] py-3 px-6 items-center justify-center gap-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={idx}
            to={navItem.link}
            className={cn(
              "relative text-white items-center flex hover:text-neutral-300 font-medium"
            )}
          >
            {navItem.name}
          </Link>
        ))}
        <button className="font-medium">
          {
            auth.user === null ? (
              <span onClick={() => navigate('/login')} className="text-blue-500">Login</span>
            ) : (
              <span onClick={handleLogout}>Logout</span>
            )
          }
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
