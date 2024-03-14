import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="min-h-screen bg-putih flex flex-col items-center justify-center gap-[48px]">
      {/* Title container */}
      <div className="flex flex-col items-center gap-[10px]">
        <img src="/Beziertor.svg" alt="" />
        <span className="font-poppins font-medium text-[#21507C] text-2xl">
          Bezier Curve Generator
        </span>
      </div>

      {/* Buttons container */}
      <div className="flex flex-col gap-[10px]">
        <Link to="/quadratic2">
          <button className="bg-hijaua font-poppins font-semibold text-putih w-44 h-12 rounded-xl text-base">
            Quadratic
          </button>
        </Link>
        <Link to="/generalized2">
          <button className="bg-putih font-poppins font-semibold text-hijaua w-44 h-12 rounded-xl border-2 text-base border-hijaua">
            N-control points
          </button>
        </Link>
      </div>
      {/* Authors container */}
      <AuthorsContainer />
    </main>
  );
};

export function AuthorsContainer() {
  return (
    <div className="flex flex-col items-center gap-[4px]">
      <span className="font-poppins font-semibold text-base">Made by</span>
      <div className="flex flex-col items-center gap-[2px]">
        <span className="font-poppins font-medium text-base">
          Gana 13522066
        </span>
        <span className="font-poppins font-medium text-base">
          Dhidit 13522040
        </span>
      </div>
    </div>
  );
}

export default Main;
