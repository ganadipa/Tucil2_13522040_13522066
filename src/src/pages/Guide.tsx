import Sidebar from "../components/Sidebar";

const Guide = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <Sidebar />
        <main className="aspect-[16/8.5] p-2 flex flex-col items-center  w-[85%] rounded-b rounded-r bg-cyan-900 shadow-xl z-0 relative gap-5 overflow-y-scroll">
          {/*Introduction section */}
          <section>
            {Array.from({ length: 50 }).map((_, idx) => {
              return <div>hello, {idx}</div>;
            })}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Guide;
