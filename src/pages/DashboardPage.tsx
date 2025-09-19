import "./DashboardPage.css";
import title from "../assets/title_light.png";

function DashboardPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col justify-center items-center w-3/4">
          <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
          <h1>Dashboard</h1>
        </div>
        <div className="p-2">
          <div className="card">
            <button className="mx-2">Log in!</button>
            <button className="mx-2">Sign up</button>
          </div>
          <div>
            <p className="tagline">Backup. Migrate. Share.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
