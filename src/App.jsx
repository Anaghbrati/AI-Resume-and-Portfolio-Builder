import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSChecker from "./pages/ATSChecker";
import PortfolioBuilder from "./pages/PortfolioBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/resume" element={<ResumeBuilder />} />

        <Route path="/ats-checker" element={<ATSChecker />} />

        <Route path="/portfolio" element={<PortfolioBuilder />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;