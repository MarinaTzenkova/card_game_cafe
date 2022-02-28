import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout/Layout";
import { Home } from "./Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { joinGameCafe } from "../socket";

import Game from "./Game/Game";
import Rooms from "./Game/Rooms";
import { GameJoin } from "./Game/GameJoin";
import RWhist from "./Whist/RWhist";
import WaitingRoom from "./Game/WaitingRoom";
import NavBar from "./common/NavigationBar/NavBar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // attach sockets for game info
    joinGameCafe(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id/join" element={<GameJoin />} />
          <Route path="/game/:id/waiting-room" element={<WaitingRoom />} />
          <Route path="/game/:id" element={<RWhist />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
