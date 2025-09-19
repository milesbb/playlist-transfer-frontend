import "./LoginPage.css";
import title from "../assets/title_light.png";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
