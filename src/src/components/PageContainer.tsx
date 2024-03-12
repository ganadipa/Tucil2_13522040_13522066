import React, { useEffect, useState } from "react";
import { Point } from "../types";
import CanvasComponent from "./CanvasComponents";
import InputTable from "./Input";
import { BezierCurve } from "../logic/Bezier";

const PageContainer = ({ num }: { num: number }) => {
  const [points, setPoints] = useState<Point[]>(
    Array.from({ length: num }, () => ({ x: 0, y: 0 }))
  );

  const [bezierPoints, setBezierPoints] = useState<Point[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      setBezierPoints(BezierCurve(points, 3));
    }
  }, [show, setBezierPoints, points]);

  useEffect(() => {
    setPoints(Array.from({ length: num }, () => ({ x: 0, y: 0 })));
  }, [num]);

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
      <button onClick={handleSubmit}>ANIMATE</button>
    </section>
  );
};

export default PageContainer;
