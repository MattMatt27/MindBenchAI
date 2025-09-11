import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TechnicalProfile from "./components/TechnicalProfile";
import Framework from "./components/Framework"
import Community from "./components/Community";
import Leaderboard from "./components/Leaderboard";
import "./styles/main.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technical_profile" element={<TechnicalProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path = "/framework" element={<Framework />} />
        <Route path = "/community" element ={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}
