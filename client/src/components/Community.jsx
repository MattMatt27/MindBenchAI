import "../styles/Community.css"
import React from "react";
import {Chrono} from 'react-chrono';

export default function Community() {
  const [activeTab, setActiveTab] = React.useState("What's New");
  const items = [
    {title: "Sept 1st, 2025",
      message: "Version 1.0 is released"
    },
    {title: "Nov 2nd, 2025",
      message: "Version 1.1 is released",
      new_features: "Claude 5.0 added"
    }
  ]
  return (
    <div>
      <div className="cm-tabs">
        <button
          className={`cm-tab ${activeTab === "What's New" ? "active" : ""}`}
          onClick={() => setActiveTab("What's New")}
          type="button"
        >
          What's new
        </button>
        <button
          className={`cm-tab ${activeTab === "Team members" ? "active" : ""}`}
          onClick={() => setActiveTab("Team members")}
          type="button"
        >
          Team members
        </button>
      </div>

      {activeTab === "What's New" && 
        (<div>
          <Chrono items = {items} />
        </div>)}

    </div>
  )
}