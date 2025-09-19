import "./SignUpPage.css";
import title from "../assets/title_light.png";
import SignUpForm from "../components/SignupForm";
import BackArrow from "../components/BackArrow";

function SignUpPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <BackArrow />
        <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
        <SignUpForm />
      </div>
    </>
  );
}

export default SignUpPage;
