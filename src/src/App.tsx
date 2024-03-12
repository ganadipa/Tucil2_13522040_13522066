import React, { useEffect, useState } from "react";
import "./App.css";
import CanvasComponent from "./components/CanvasComponents";
import Input from "./components/Input";
import { Point } from "./types";
import { QuadraticBezierCurve } from "./logic/Bezier";
import PageContainer from "./components/PageContainer";
import Sidebar from "./components/Sidebar";
import PageRoute from "./routes/pageroute";

function App() {
  return (
    <div className="App h-[100vh] w-[100vw] bg-sky-950 ">
      <PageRoute />
    </div>
  );
}

export default App;
