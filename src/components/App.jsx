import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import NavBar from "./common/NavBar";
import Game from "./Game/Game";
import { Home } from "./Home/Home";
import Cards from "./Whist/Cards";
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
              <div className="w-1/2 h-1/2">
                <Canvas
                  style={{ background: "#171717" }}
                  camera={{
                    fov: 175,
                    near: 0.1,
                    scale: 600,
                    far: 1000,
                    position: [0, 0, 200],
                  }}
                >
                  <ambientLight intensity={1} />
                  <Suspense fallback={null}>
                    <Cards />
                  </Suspense>
                </Canvas>
              </div>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
