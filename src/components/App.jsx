import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import { Home } from "./Home/Home";
import NavBar from "./common/NavBar";
import Game from "./Game/Game";
import { useEffect } from "react";
import Rooms from "./Game/Rooms";
import { joinGameCafe } from "../socket";
import { useDispatch } from "react-redux";
import { GameJoin } from "./Game/GameJoin";
import RWhist from "./Whist/RWhist";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // attach sockets for game info
    joinGameCafe(dispatch);
  }, []);

  return (
    <div>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id/join" element={<GameJoin />} />
          <Route path="/game/:id" element={<RWhist />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
