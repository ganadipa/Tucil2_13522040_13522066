import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Quadratic from "../pages/Quadratic";
import { DefaultRedirection } from "./redirect";
import Compare from "../pages/Compare";
import Guide from "../pages/Guide";
import NotIntend from "../pages/NotIntend";
import Main from "../pages/Main";
import Quadratic2 from "../pages/Quadratic2";
import Generalized2 from "../pages/Generalized2";
import Generalized from "../pages/Generalized";

const PageRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        navigate("/NotIntend");
      }
    };

    handleResize(); // Check immediately on mount
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, [navigate]); // Dependency array with navigate to avoid adding multiple listeners

  return (
    <>
      <Routes>
        {/* <Route path="/quadratic" element={<Quadratic />} /> */}
        <Route path="/quadratic" element={<Quadratic2 />} />
        <Route path="/generalized" element={<Generalized2 />} />
        {/* <Route path="/generalized2" element={<Generalized2 />} /> */}
        {/* <Route path="/compare" element={<Compare />} />
        <Route path="/guide" element={<Guide />} /> */}
        <Route path="/notintend" element={<NotIntend />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<DefaultRedirection />} />
      </Routes>
    </>
  );
};

export default PageRoute;
