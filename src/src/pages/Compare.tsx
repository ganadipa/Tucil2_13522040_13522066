import Sidebar from "../components/Sidebar";
import PageContainer from "../components/PageContainer";

const Compare = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer compareMode={true} />
      </div>
    </div>
  );
};

export default Compare;
