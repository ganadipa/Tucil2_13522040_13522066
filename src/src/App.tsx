import PageRoute from "./routes/pageroute";

function App() {
  return (
    <div className="App h-[100vh] w-[100vw] bg-sky-950 ">
      <header>Bezier Curve (middle point divide and conquer)</header>
      <div className="py-8">
        <PageRoute />
      </div>
    </div>
  );
}

export default App;
