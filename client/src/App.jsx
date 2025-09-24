import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TechnicalProfile from "./components/TechnicalProfile";
import Framework from "./components/Framework"
import Community from "./components/Community";
import Leaderboard from "./components/Leaderboard";
import StandardizeTest from "./components/StandardizeTest"
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import "./styles/main.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technical_profile" element={<TechnicalProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/standard_test" element = {<StandardizeTest />}/>
          <Route path = "/framework" element={<Framework />} />
          <Route path = "/community" element ={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
