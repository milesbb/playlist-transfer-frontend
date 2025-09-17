import "./App.css";
import animation from "./cropped_landing_page_dog.gif";
import title from "./title_light.png";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={animation} alt="Animated GIF" />
        <img src={title} alt="Title 'Playlist Transfer'" />
      </div>
      <div className="card">
        <button className="mx-2">Log in</button>
        <button className="mx-2">Sign up</button>
      </div>
      <p className="read-the-docs">Backup. Migrate. Share.</p>
    </>
  );
}

export default App;
