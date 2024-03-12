import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageContainer from "../components/PageContainer";

const Generalized = () => {
  const [num, setNum] = useState<number>(3);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum(Number(event.target.value));
  };

  return (
    <div className="py-12">
      <input type="number" value={num} onChange={handleChange} />
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer num={num} compareMode={false} />
      </div>
    </div>
  );
};

export default Generalized;
