import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrazilAgtechMarketEntry from "./pages/BrazilAgtechMarketEntry";
import RedeNativa from "./pages/RedeNativa";
import RouteTracker from "./components/RouteTracker";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/brazil-agtech-market-entry"
          element={<BrazilAgtechMarketEntry />}
        />
        <Route path="/rede-nativa" element={<RedeNativa />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}