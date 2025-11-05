import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrokerWebsite from "./BrokerWebsite";
import HoldingsPage from "./HoldingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrokerWebsite />} />
        <Route path="/holdings" element={<HoldingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
