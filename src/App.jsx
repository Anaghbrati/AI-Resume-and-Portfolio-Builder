import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSchecker from "./pages/ATSchecker";
import PortfolioBuilder from "./pages/PortfolioBuilder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/ats-checker" element={<ATSchecker />} />
      <Route path="/portfolio" element={<PortfolioBuilder />} />
    </Routes>
  );
}

export default App;