import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { AuthorsContainer } from "./Main";
import CanvasComponent from "../components/CanvasComponents";
import { Switch, alpha, styled } from "@mui/material";
import { DnCBezierCurve } from "../logic/Bezier";
import toast from "react-hot-toast";
import PointsTable from "../components/PointsTable";
import { Point } from "../types";

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

const parseControlPoints = (
  inputText: string
): {
  success: boolean;
  points: Point[];
  message: string;
} => {
  const lines = inputText.trim().split("\n");
  const numPoints = parseInt(lines[0]);

  if (!Number.isInteger(numPoints) || numPoints < 1) {
    return {
      success: false,
      message: "Invalid number of control points.",
      points: [],
    };
  }

  if (lines.length !== numPoints + 1) {
    return {
      success: false,
      message: "Number of lines does not match the number of control points.",
      points: [],
    };
  }

  const points = [];
  for (let i = 1; i <= numPoints; i++) {
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length !== 2) {
      return {
        success: false,
        message: `Invalid format on line ${i + 1}.`,
        points: [],
      };
    }
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (isNaN(x) || isNaN(y)) {
      return {
        success: false,
        message: `Invalid coordinates on line ${i + 1}.`,
        points: [],
      };
    }
    points.push({ x, y });
  }

  return { success: true, points, message: "Successfully matches format." };
};

const Generalized2 = () => {
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
  const [duration, setDuration] = useState<number>(0);
  const [numIteration, setNumIteration] = useState<number>(2);
  const [showResultPoints, setShowResultPoints] = useState<boolean>(false);
  const [text, setText] = useState("");

  const [sequence, setSequence] = useState<
    {
      points: Point[];
      duration: number;
    }[]
  >([]);
  const [currentShowing, setCurrentShowing] = useState<number>(0);
  const animating = sequence.length > 0;

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

    if (numIteration > 18 || numIteration < 1) {
      toast.error("Number of iteration must be between 1 and 85 inclusively.");
      return;
    }

    const parseResult = parseControlPoints(text);
    if (!parseResult.success) {
      toast.error(parseResult.message);
      return;
    }

    setControlPoints(parseResult.points);
    const { points, duration } = DnCBezierCurve(
      parseResult.points,
      numIteration
    );
    setBezierPoints(points);
    setDuration(duration);
  };

  useEffect(() => {}, [bezierPoints, controlPoints]);

  const handleAnimate: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (animating) {
      toast.error("Wait for the animation to finish!");
    }

    if (!Number.isInteger(numIteration)) {
      toast.error("Number of iterations must be an integer.");
      return;
    }

    if (numIteration > 18 || numIteration < 1) {
      toast.error("Number of iteration must be between 1 and 18 inclusively.");
      return;
    }

    const parseResult = parseControlPoints(text);
    if (!parseResult.success) {
      toast.error(parseResult.message);
      return;
    }

    setControlPoints(parseResult.points);

    setCurrentShowing(0);
    const calculateBezierPoints = (iteration: number) => {
      return DnCBezierCurve(parseResult.points, iteration);
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
            Generalized Bezier Curve
          </header>
          <div className="flex items-center justify-center">
            <FileInputComponent text={text} setText={setText} />
            <div className="place-self-start p-4">
              <header className="font-poppins font-medium">Format input</header>
              <textarea
                disabled
                className="w-[250px] p-2 h-[300px] border-2 border-gray-300 rounded-md bg-gray-400/50"
                value={`<N> (number of control points)\n<P0_x> <P0_y>\n<P1_x> <P2_y>\n...\n<PN-1_x> <PN-1_y>\n`}
              />
            </div>
          </div>

          <section className="flex flex-row items-center justify-center gap-[48px]">
            <div className="flex flex-col gap-4">
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
              {animating && (
                <div>
                  <p className="text-stone-500 font-poppins font-medium">
                    Showing iteration:{" "}
                    <span>{show ? currentShowing + 1 : "None"}</span>.
                  </p>
                </div>
              )}
              <div>
                <p className="text-stone-500 font-poppins font-medium">
                  Execution time: <span>{Number(duration).toFixed(5)}</span>{" "}
                  milliseconds.
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
      {showResultPoints && bezierPoints.length > 0 && (
        <section className="flex items-center justify-center">
          <PointsTable points={bezierPoints} />
        </section>
      )}
      <AuthorsContainer />
    </main>
  );
};

const FileInputComponent = ({
  text,
  setText,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) setText(e.target.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="p-4">
      <header className="font-poppins font-medium">Point input</header>
      <textarea
        className="w-full p-2 h-[300px] border-2 border-gray-300 rounded-md"
        value={text}
        onChange={handleTextChange}
      />
      <label className="block mt-2">
        <span className="sr-only">Choose text file</span>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-hijau2 file:text-white
              hover:file:bg-hijau1
              cursor-pointer"
          accept=".txt"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default Generalized2;
