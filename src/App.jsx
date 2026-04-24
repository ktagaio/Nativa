import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrazilAgtechMarketEntry from "./pages/BrazilAgtechMarketEntry";
import RouteTracker from "./components/RouteTracker";

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
      </Routes>
    </BrowserRouter>
  );
}