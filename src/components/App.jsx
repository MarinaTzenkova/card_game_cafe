import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import NavBar from "./common/NavBar";
import Game from "./Game/Game";
import { Home } from "./Home/Home";
import Cards from "./Whist/Cards";
import Deck from "./Whist/Cards/Deck";
import RWhist from "./Whist/RWhist";

function App() {
  return (
    <div>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/r-whist" element={<RWhist />} />
          <Route path="/game" element={<Game />} />
          <Route
            path="/cards"
            element={
              <Canvas
                style={{ background: "gray" }}
                camera={{
                  fov: 10,
                  near: 0.1,
                  scale: window.innerWidth / window.innerHeight,
                  far: 1000,
                  position: [0, 0, 100],
                }}
              >
                <ambientLight intensity={1} />
                <Suspense fallback={null}>
                  <Deck />
                </Suspense>
              </Canvas>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
