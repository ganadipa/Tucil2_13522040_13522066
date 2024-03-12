import PageContainer from "../components/PageContainer";
import Sidebar from "../components/Sidebar";

const Quadratic = () => {
  return (
    <div className="py-12">
      {" "}
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer num={3} />
      </div>
    </div>
  );
};

export default Quadratic;
