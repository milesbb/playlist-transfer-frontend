import "./LoginPage.css";
import title from "../assets/title_light.png";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col justify-center items-center w-3/4">
          <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
          <h1>Log in!</h1>
        </div>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
