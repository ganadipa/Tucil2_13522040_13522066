import React, { MouseEventHandler, useEffect, useState } from "react";
import { AuthorsContainer } from "./Main";
import CanvasComponent from "../components/CanvasComponents";
import { Point } from "../types";
import { Switch, alpha, duration, styled } from "@mui/material";
import { BezierCurve, QuadraticBezierCurve } from "../logic/Bezier";
import toast from "react-hot-toast";
import PointsTable from "../components/PointsTable";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#78C93C",
    "&:hover": {
      backgroundColor: alpha("#78C93C", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#78C93C",
  },
}));

const Quadratic2 = () => {
  const [bezierPoints, setBezierPoints] = useState<Point[]>([]);
  const [controlPoints, setControlPoints] = useState<Point[]>([
    {
      x: 0,
      y: 0,
    },
    {
      x: 15,
      y: 15,
    },
    {
      x: 15,
      y: 0,
    },
  ]);
  const show = bezierPoints.length > 0;
  const [usingDnC, setUsingDnC] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [numIteration, setNumIteration] = useState<number>(2);
  const [showResultPoints, setShowResultPoints] = useState<boolean>(false);

  const [sequence, setSequence] = useState<
    {
      points: Point[];
      duration: number;
    }[]
  >([]);
  const [currentShowing, setCurrentShowing] = useState<number>(0);
  const animating = sequence.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsingDnC(event.target.checked);
  };

  const handleShowAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowResultPoints(event.target.checked);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (animating) {
      toast.error("Wait for the animation to finish!");
    }

    if (!Number.isInteger(numIteration)) {
      toast.error("Number of iterations must be an integer.");
      return;
    }

    if (numIteration > 15 || numIteration < 1) {
      toast.error("Number of iteration must be between 1 and 15 inclusively.");
      return;
    }

    let result, dur;
    if (usingDnC) {
      const { points, duration } = QuadraticBezierCurve({
        points: controlPoints,
        iteration: numIteration,
        type: "DnC",
      });
      result = points;
      dur = duration;
    } else {
      const { points, duration } = QuadraticBezierCurve({
        points: controlPoints,
        iteration: 2,
        type: "Bruteforce",
        increment: 2,
      });
      result = points;
      dur = duration;
    }
    setBezierPoints(result);
    setDuration(dur);
  };

  const handleAnimate: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (animating) {
      toast.error("Canvas is currently animating...");
      return;
    }

    setCurrentShowing(0);
    const calculateBezierPoints = (iteration: number) => {
      if (usingDnC) {
        return QuadraticBezierCurve({
          points: controlPoints,
          iteration: iteration,
          type: "DnC",
        });
      } else {
        return QuadraticBezierCurve({
          points: controlPoints,
          iteration: iteration,
          type: "Bruteforce",
          increment: 0.01,
        });
      }
    };

    let sequence: {
      points: Point[];
      duration: number;
    }[] = [];
    for (let i = 0; i < numIteration; i++) {
      sequence.push(calculateBezierPoints(i + 1));
    }
    setSequence(sequence);
  };

  function handleIterationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNumIteration(Number(e.target.value));
  }

  useEffect(() => {
    setBezierPoints([]);
    setDuration(0);
  }, [usingDnC]);

  useEffect(() => {
    setBezierPoints([]);
    setDuration(0);
  }, [controlPoints]);

  useEffect(() => {
    if (animating) {
      setBezierPoints(sequence[currentShowing].points);
      setDuration(sequence[currentShowing].duration);
      setTimeout(() => {
        if (currentShowing !== sequence.length - 1) {
          setCurrentShowing((curr) => curr + 1);
        } else {
          setSequence([]);
        }
      }, 1000);
    }
  }, [animating, sequence, currentShowing]);

  return (
    <main className="min-h-screen bg-putih flex flex-col p-4">
      <div className="h-full w-full">
        <section className="flex items-center flex-col">
          <header className="font-poppins font-semibold text-2xl pb-4">
            Quadratic Bezier Curve
          </header>
          <Input points={controlPoints} setPoints={setControlPoints} />

          <section className="flex flex-row items-center justify-center gap-[48px]">
            <div className="flex flex-col gap-4">
              {/* Bruteforce - Divide and conquer switch button*/}
              <div className="flex flex-row items-center">
                <span className="font-poppins font-medium text-stone-500">
                  Brute Force
                </span>
                <GreenSwitch
                  checked={usingDnC}
                  onChange={handleChange}
                  defaultChecked
                  className="green"
                />
                <span className="font-poppins font-medium text-hijau1">
                  Middle Point Divide and Conquer
                </span>
              </div>

              {/* Show result points switch button*/}
              <div className="flex flex-row items-center">
                <GreenSwitch
                  checked={showResultPoints}
                  onChange={handleShowAll}
                />
                <span
                  className={`font-poppins font-medium ${
                    showResultPoints ? "text-hijau1" : "text-stone-500"
                  }`}
                >
                  Show all curve points
                </span>
              </div>

              <div>
                <span className="text-stone-500 font-poppins font-medium">
                  {" "}
                  Number of iterations:{" "}
                </span>
                <input
                  type="number"
                  className="border border-blue-300 rounded px-2 py-1 w-1/4 text-center text-xs"
                  value={numIteration}
                  onChange={(e) => handleIterationChange(e)}
                />
              </div>
              <div>
                <p className="text-stone-500 font-poppins font-medium">
                  Showing iteration:{" "}
                  <span>{show ? currentShowing + 1 : "None"}</span>.
                </p>
              </div>
              <div>
                <p className="text-stone-500 font-poppins font-medium">
                  Execution time: <span>{duration}</span> seconds.
                </p>
              </div>
              <div className="flex flex-row items-center justify-center gap-4">
                <button
                  className="bg-hijaua font-poppins font-semibold text-putih w-24 h-12 rounded-xl text-base"
                  onClick={handleSubmit}
                >
                  Run
                </button>
                <button
                  className="bg-putih font-poppins font-semibold text-hijaua w-24 h-12 rounded-xl border-2 text-base border-hijaua"
                  onClick={handleAnimate}
                >
                  Animate
                </button>
              </div>
            </div>
            <div>
              <CanvasComponent
                points={controlPoints}
                bezierPoints={bezierPoints}
                show={show}
                showResultPoints={showResultPoints}
              />
            </div>
          </section>
        </section>
      </div>
      {/*Curve points*/}
      {showResultPoints && (
        <section className="flex items-center justify-center">
          <PointsTable points={bezierPoints} />
        </section>
      )}
      <AuthorsContainer />
    </main>
  );
};

type InputProps = {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
};
const Input: React.FC<InputProps> = ({ points, setPoints }) => {
  const handleInputChange = (
    index: number,
    coord: "x" | "y",
    value: number
  ) => {
    const newPoints = points.map((point, i) =>
      i === index ? { ...point, [coord]: value } : point
    );
    setPoints(newPoints);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-xs mb-2">
        <div className="w-1/4 text-center font-poppins font-semibold">
          Point Table
        </div>
        <div className="w-1/4 text-center font-poppins font-medium">X</div>
        <div className="w-1/4 text-center font-poppins font-medium">Y</div>
      </div>
      {points.map((point, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="w-1/4 text-center font-poppins font-medium">
            Point {index} :
          </div>
          <input
            type="number"
            className="border border-blue-300 rounded px-2 py-1 w-1/4 text-center text-xs"
            value={point.x}
            onChange={(e) =>
              handleInputChange(index, "x", Number(e.target.value))
            }
          />
          <input
            type="number"
            className="border border-blue-300 rounded px-2 py-1 w-1/4 text-center text-xs"
            value={point.y}
            onChange={(e) =>
              handleInputChange(index, "y", Number(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Quadratic2;
