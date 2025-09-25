import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TechnicalProfile from "./components/TechnicalProfile";
import Resources from "./components/Resources"
import Community from "./components/Community";
import Leaderboard from "./components/Leaderboard";
import StandardizeTest from "./components/StandardizeTest"
import "./styles/main.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technical_profile" element={<TechnicalProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/standard_test" element = {<StandardizeTest />}/>
        <Route path = "/resources" element={<Resources />} />
        <Route path = "/community" element ={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}
