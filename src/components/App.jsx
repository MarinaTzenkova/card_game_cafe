import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import { Home } from "./Home/Home";
import NavBar from "./common/NavBar";
import Game from "./Game/Game";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // attach sockets for game info
  }, []);
  return (
    <div>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
