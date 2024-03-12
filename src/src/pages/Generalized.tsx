import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageContainer from "../components/PageContainer";

const Generalized = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer generalized compareMode={false} />
      </div>
    </div>
  );
};

export default Generalized;
