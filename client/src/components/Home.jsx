import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">MindBenchAI</h1>
        <p className="home-description">
          A comprehensive framework for evaluating and comparing AI models and tools 
          in mental health applications. Discover technical capabilities, performance 
          metrics, and communication dynamics across the AI landscape.
        </p>
      </div>

      <div className="home-content">
        <div className="home-column">
          <h2 className="column-title">Profile</h2>
          
          <div className="section-card">
            <h3 className="section-title">Technical Profile</h3>
            <p className="section-description">
              Explore detailed technical specifications, platform support, pricing, 
              and compliance information for AI tools and base models.
            </p>
            <button 
              className="section-button"
              onClick={() => navigate("/technical_profile")}
            >
              Technical Profile
            </button>
          </div>

          <div className="section-card">
            <h3 className="section-title">Communication Dynamics</h3>
            <p className="section-description">
              Analyze how AI models communicate, their conversation patterns, 
              and interpersonal interaction capabilities.
            </p>
            <button 
              className="section-button" 
              onClick = {() => navigate("/standard_test")}
            >
              Standardize test
            </button>
          </div>
        </div>

        <div className="home-column">
          <h2 className="column-title">Performance</h2>
          
          <div className="section-card">
            <h3 className="section-title">Benchmarking</h3>
            <p className="section-description">
              Compare performance metrics, accuracy scores, and standardized 
              benchmark results across different AI models and configurations.
            </p>
            <button className="section-button" onClick = {() => navigate("/leaderboard")}>
              Leaderboard
            </button>
          </div>

          <div className="section-card">
            <h3 className="section-title">Reasoning</h3>
            <p className="section-description">
              Evaluate logical reasoning capabilities, problem-solving approaches, 
              and cognitive processing patterns in AI systems.
            </p>
            <button className="section-button" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
