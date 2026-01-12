import "./SignUpPage.css";
import title from "../assets/title_light.png";
import SignUpForm from "../components/SignupForm";
import BackArrow from "../components/BackArrow";
import Spinner from "../components/Spinner";

type SignUpPageProps = {
  loadingRefresh: boolean;
};

function SignUpPage({ loadingRefresh }: SignUpPageProps) {
  return (
    <>
      {loadingRefresh ? (
        <Spinner fullscreen />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-screen ">
            <BackArrow />
            <img className="flex" src={title} alt="Title 'Playlist Transfer'" />
            <SignUpForm />
          </div>
        </>
      )}
    </>
  );
}

export default SignUpPage;
