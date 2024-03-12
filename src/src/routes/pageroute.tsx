import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Quadratic from "../pages/Quadratic";
import Generalized from "../pages/Generalized";
import { DefaultRedirection } from "./redirect";
import Compare from "../pages/Compare";
import Guide from "../pages/Guide";
import NotIntend from "../pages/NotIntend";

const PageRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        navigate("/NotIntend");
      } else {
        navigate("/Guide");
      }
    };

    handleResize(); // Check immediately on mount
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, [navigate]); // Dependency array with navigate to avoid adding multiple listeners

  return (
    <>
      <Routes>
        <Route path="/quadratic" element={<Quadratic />} />
        <Route path="/generalized" element={<Generalized />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/notintend" element={<NotIntend />} />
        <Route path="*" element={<DefaultRedirection />} />
      </Routes>
    </>
  );
};

export default PageRoute;
