import React from "react";
import { Point } from "../types"; // Assuming you have a Point type defined elsewhere

type PointsTableProps = {
  points: Point[];
};

const PointsTable: React.FC<PointsTableProps> = ({ points }) => {
  const getLabel = (index: number) => {
    const letters = "ABCDEFGHIJKLMNOQRSTUVWXYZ";
    const quotient = Math.floor(index / 25);
    const remainder = index % 25;
    return letters[remainder] + quotient.toString();
  };

  return (
    <table className="min-w-full table-fixed">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
            Label
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
            X
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
            Y
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {points.map((point, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {getLabel(index)}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {point.x}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {point.y}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PointsTable;
