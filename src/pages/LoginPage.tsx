import "./LoginPage.css";
import title from "../assets/title_light.png";
import LoginForm from "../components/LoginForm";
import BackArrow from "../components/BackArrow";
import Spinner from "../components/Spinner";

type LoginPageProps = {
  loadingRefresh: boolean;
};

function LoginPage({ loadingRefresh }: LoginPageProps) {
  return (
    <>
      {loadingRefresh ? (
        <Spinner fullscreen />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-screen ">
            <BackArrow />
            <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
            <LoginForm />
          </div>
        </>
      )}
    </>
  );
}

export default LoginPage;
