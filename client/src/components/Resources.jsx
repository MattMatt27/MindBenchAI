import React from "react";
import "../styles/Resources.css";

export default function Resources() {
  const [activeTab, setActiveTab] = React.useState("Publication");
  return (
    <div>

      {/*Switching between tab for diff tests*/}
      <div className = 'g-tabs'>
        <button 
          className = {`g-tab-bttn ${activeTab === 'Publication' ? "active": ""}`}
          onClick = {() => setActiveTab('Publication')}
        >
          Publication
        </button>

        <button
          className={`g-tab-bttn ${activeTab === 'Articles' ? "active": ""}`}
          onClick = {() => setActiveTab('Articles')}
        >
          AI/ML Articles
        </button>
      </div>

    </div>
  )
}
