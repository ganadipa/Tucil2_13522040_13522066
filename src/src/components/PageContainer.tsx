import React, { useEffect, useState } from "react";
import { Point } from "../types";
import CanvasComponent from "./CanvasComponents";
import InputTable from "./Input";
import { BezierCurve } from "../logic/Bezier";

const PageContainer = ({
  compareMode,
  generalized,
}: {
  compareMode: boolean;
  generalized?: boolean;
}) => {
  const [degree, setDegree] = useState(3);
  const [points, setPoints] = useState<Point[]>(
    Array.from({ length: degree }, () => ({ x: 0, y: 0 }))
  );

  const [bezierPoints, setBezierPoints] = useState<Point[]>([]);
  const [show, setShow] = useState(false);
  const [sequence, setSequence] = useState<Point[][]>([]);
  const [currentShowing, setCurrentShowing] = useState<number>(0);
  const animating = sequence.length > 0;

  function handleSubmit() {
    setBezierPoints(BezierCurve(points, 3));
  }

  function handleAnimate() {
    let sequence: Point[][] = [];
    for (let i = 0; i < 5; i++) {
      sequence.push(BezierCurve(points, i + 1));
    }
    setSequence(sequence);
    setShow(true);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDegree(Number(event.target.value));
  };

  useEffect(() => {
    setShow(true);
    if (!show) {
      setBezierPoints([]);
    }
  }, [bezierPoints, show]);

  useEffect(() => {
    setPoints(Array.from({ length: degree }, () => ({ x: 0, y: 0 })));
  }, [degree]);

  useEffect(() => {
    if (animating) {
      setBezierPoints(sequence[currentShowing]);
      setTimeout(() => {
        if (currentShowing !== sequence.length - 1) {
          setCurrentShowing((curr) => curr + 1);
        } else {
          setSequence([]);
          setCurrentShowing(0);
        }
      }, 1000);
    }
  }, [animating, sequence, currentShowing]);

  return (
    <section className="aspect-[16/8.5] p-2 flex flex-col items-center  w-[85%] rounded-b rounded-r bg-cyan-900 shadow-xl z-0 relative gap-5">
      {generalized && (
        <input type="number" value={degree} onChange={handleChange} />
      )}

      <InputTable points={points} setPoints={setPoints} setShow={setShow} />
      <button onClick={handleSubmit}>SUBMIT </button>

      <div className="flex flex-row justify-center items-center">
        <div>
          {/* <CanvasComponent
            points={points}
            bezierPoints={bezierPoints}
            show={show}
          /> */}
        </div>

        <button
          onClick={handleAnimate}
          className={`mx-12 ${animating ? "invisible" : ""}`}
          disabled={animating}
        >
          ANIMATE
        </button>

        {compareMode && (
          <div>
            {/* <CanvasComponent
              points={points}
              bezierPoints={bezierPoints}
              show={show}
            /> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageContainer;
