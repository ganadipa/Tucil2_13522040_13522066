import PageContainer from "../components/PageContainer";
import Sidebar from "../components/Sidebar";

const Quadratic = () => {
  return (
    <div className="">
      {" "}
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer compareMode={false} />
      </div>
    </div>
  );
};

export default Quadratic;
