import React from "react";
import { AuthorsContainer } from "./Main";

const Quadratic2 = () => {
  return (
    <main className="min-h-screen bg-putih flex flex-col">
      <div className="h-full w-full">
        <section className="">
          <header className="font-poppins font-semibold text-2xl">
            Middle Point Bezier Curve
          </header>
        </section>
        <section>
          <header className="font-poppins font-semibold text-2xl">
            Brute Force Bezier Curve
          </header>
        </section>
      </div>
      <AuthorsContainer />
    </main>
  );
};

export default Quadratic2;
