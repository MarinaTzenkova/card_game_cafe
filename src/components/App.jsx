import { Routes, Route } from "react-router-dom";
import { Layout } from "./common/Layout";
import Temp from "./Temp";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Temp />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
