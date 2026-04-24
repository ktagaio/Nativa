import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrazilAgtechMarketEntry from "./pages/BrazilAgtechMarketEntry";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/brazil-agtech-market-entry"
          element={<BrazilAgtechMarketEntry />}
        />
      </Routes>
    </BrowserRouter>
  );
}