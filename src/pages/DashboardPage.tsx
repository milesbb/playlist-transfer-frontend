import "./DashboardPage.css";
import Header from "../components/Header";
import { checkIfBeta } from "../utils/checkIfBeta";
import BetaDog from "./BetaDog";

function DashboardPage() {
  const isBeta = checkIfBeta();

  return (
    <div className="dashboard-container flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        {isBeta ? (
          <BetaDog />
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-white text-2xl">Dashboard</h1>
            </div>
            <div className="p-2"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
