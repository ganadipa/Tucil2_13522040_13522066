import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Point } from "../types";
import { QuadraticBezierCurve } from "../logic/Bezier";
import CanvasComponent from "./CanvasComponents";
import InputTable from "./Input";

const PageContainer = () => {
  const [points, setPoints] = useState<Point[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [bezierPoints, setBezierPoints] = useState<Point[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      setBezierPoints(QuadraticBezierCurve(points, 2));
    }
  }, [show, setBezierPoints, points]);

  function handleSubmit() {
    setShow(true);
  }

  return (
    <section className="aspect-[16/8.5] p-2 flex flex-col justify-center items-center  w-[85%] rounded-b rounded-r bg-cyan-900 shadow-xl z-0 relative gap-5">
      <InputTable points={points} setPoints={setPoints} setShow={setShow} />
      <button onClick={handleSubmit}>SUBMIT </button>

      <CanvasComponent
        points={points}
        bezierPoints={bezierPoints}
        show={show}
      />
    </section>
  );
};

export default PageContainer;
