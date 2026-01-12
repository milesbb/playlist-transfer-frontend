import "./ProfilePage.css";
import Header from "../components/Header";
import { checkIfBeta } from "../utils/checkIfBeta";
import BetaDog from "./BetaDog";
import AccountSettings from "../components/AccountSettings";
import ThirdPartySettings from "../components/ThirdPartySettings";

function ProfilePage() {
  const isBeta = checkIfBeta();
  return (
    <div className="dashboard-container flex flex-col min-h-screen">
      <Header location="Profile" />
      <div className="flex flex-col items-center justify-center flex-grow">
        {!isBeta ? (
          <BetaDog />
        ) : (
          <>
            <div className="text-white max-w-3xl mx-auto px-6 py-10">
              <h1 className="text-3xl font-bold mb-8">Settings</h1>
              <ThirdPartySettings />
              <AccountSettings />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
