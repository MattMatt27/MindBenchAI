import "../styles/Community.css"
import React from "react";

export default function Community() {
  const [activeTab, setActiveTab] = React.useState("What's New");
  return (
    <div>
      <div className="st-tabs">
        <button
          className={`st-tab ${activeTab === "What's New" ? "active" : ""}`}
          onClick={() => setActiveTab("What's New")}
          type="button"
        >
          What's new
        </button>
        <button
          className={`st-tab ${activeTab === "Team members" ? "active" : ""}`}
          onClick={() => setActiveTab("Team members")}
          type="button"
        >
          Team members
        </button>
      </div>

    </div>
  )
}