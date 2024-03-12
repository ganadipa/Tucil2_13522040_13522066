import React from "react";
import { Route, Routes } from "react-router-dom";
import Quadratic from "../pages/Quadratic";
import Generalized from "../pages/Generalized";
import { DefaultRedirection } from "./redirect";

const PageRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/quadratic" element={<Quadratic />} />
        <Route path="/generalized" element={<Generalized />} />
        <Route path="*" element={<DefaultRedirection />} />
      </Routes>
    </>
  );
};

export default PageRoute;
