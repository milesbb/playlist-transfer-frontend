import "./ProfilePage.css";
import Header from "../components/Header";

function ProfilePage() {
  return (
    <div className="dashboard-container flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-2xl">Profile</h1>
        </div>
        <div className="p-2">
          <button className="mx-2">Get details</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
