import React from "react";
import { Route, Routes } from "react-router-dom";
import Quadratic from "../pages/Quadratic";
import Generalized from "../pages/Generalized";
import { DefaultRedirection } from "./redirect";
import Compare from "../pages/Compare";

const PageRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/quadratic" element={<Quadratic />} />
        <Route path="/generalized" element={<Generalized />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<DefaultRedirection />} />
      </Routes>
    </>
  );
};

export default PageRoute;
