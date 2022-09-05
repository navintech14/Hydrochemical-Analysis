import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import InputDataset from "./containers/InputDataset";
import Map from "./containers/Map";
import TrianglePiper from "./containers/TrianglePiper";
import Visualize from "./containers/Visualize";
import Durov from "./containers/Durov";
import Gibbs from "./containers/Gibbs";
import Chadha from "./containers/Chadha";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inputdataset" element={<InputDataset />} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/trianglepiper" element={<TrianglePiper />} />
        <Route path="/map" element={<Map />} />
        <Route path="/durov" element={<Durov />} />
        <Route path="/gibbs" element={<Gibbs />} />
        <Route path="/chadha" element={<Chadha />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
