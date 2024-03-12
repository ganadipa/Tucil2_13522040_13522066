import React from "react";

// Define the type for the points and the setter function if using TypeScript
// If you're not using TypeScript, you can remove these type definitions.
type Point = {
  x: number;
  y: number;
};

type InputTableProps = {
  points: Point[];
  setPoints: (points: Point[]) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

// Modify the InputTable to accept `setPoints` as a prop
const InputTable: React.FC<InputTableProps> = ({
  points,
  setPoints,
  setShow,
}) => {
  // Handler for input changes
  const handlePointChange = (
    index: number,
    coord: "x" | "y",
    value: string
  ) => {
    const updatedPoints = [...points];
    updatedPoints[index][coord] = parseFloat(value);
    setShow(false);
    setPoints(updatedPoints);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {points.map((_, index) => (
            <th key={index}>{`Point ${index}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>X</td>
          {points.map((point, index) => (
            <td key={`x-${index}`}>
              <input
                type="number"
                value={point.x}
                onChange={(e) => handlePointChange(index, "x", e.target.value)}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td>Y</td>
          {points.map((point, index) => (
            <td key={`y-${index}`}>
              <input
                type="number"
                value={point.y}
                onChange={(e) => handlePointChange(index, "y", e.target.value)}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default InputTable;
