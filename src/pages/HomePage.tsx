import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import animation from "../assets/cropped_landing_page_dog.gif";
import title from "../assets/title_light.png";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

type HomePageProps = {
  loadingRefresh: boolean;
};

function HomePage({ loadingRefresh }: HomePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      {loadingRefresh ? (
        <Spinner fullscreen />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-screen ">
            <div className="flex flex-col justify-center items-center w-3/4">
              <img className="flex" src={animation} alt="Animated GIF" />
              <img
                className="flex"
                src={title}
                alt="Title 'Playlist Transfer'"
              />
            </div>
            <div className="p-2">
              <div className="card">
                <button className="mx-2" onClick={() => navigate("/login")}>
                  Log in
                </button>
                <button className="mx-2" onClick={() => navigate("/signup")}>
                  Sign up
                </button>
              </div>
              <div>
                <p className="tagline">Backup. Migrate. Share.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
