import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function DefaultRedirection() {
  const [route, setRoute] = useState("/Guide");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 768) {
        setRoute("/NotIntend");
      } else {
        setRoute("/");
      }
    };

    // Call the function on component mount and on every resize event
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this effect runs once on mount and unmount

  return <Navigate to={route} />;
}
