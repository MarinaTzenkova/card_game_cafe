import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import NavBar from "./common/NavBar";
import Game from "./Game/Game";
import Rooms from "./Game/Rooms";
import { Home } from "./Home/Home";
import Card from "./Whist/Card";
import RWhist from "./Whist/RWhist";

function App() {
  return (
    <div>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/r-whist" element={<RWhist />} />
          <Route path="/game/rooms" element={<Rooms />} />
          <Route path="/game" element={<Game />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
