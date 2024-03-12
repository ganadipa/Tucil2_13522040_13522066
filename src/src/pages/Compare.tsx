import Sidebar from "../components/Sidebar";
import PageContainer from "../components/PageContainer";

const Compare = () => {
  return (
    <div className="py-12">
      <div className="flex items-center justify-center">
        <Sidebar />
        <PageContainer num={3} compareMode={true} />
      </div>
    </div>
  );
};

export default Compare;
