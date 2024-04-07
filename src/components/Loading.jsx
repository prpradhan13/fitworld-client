import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = ({ path }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div className="load_page">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
        <div className="load_text">Please wait...</div>
      </div>
    </>
  );
};

export default Loading;