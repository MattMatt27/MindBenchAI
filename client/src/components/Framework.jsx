import React from "react";
import "../styles/Framework.css";

export default function Framework() {
  const [activeTab, setActiveTab] = React.useState("Big5Test");
  return (
    <div>

      {/*Switching between tab for diff tests*/}
      <div className = 'g-tabs'>
        <button 
          className = {`g-tab-bttn ${activeTab === 'Big5Test' ? "active": ""}`}
          onClick = {() => setActiveTab('Big5Test')}
        >
          Big 5 Test
        </button>

        <button
          className={`g-tab-bttn ${activeTab === 'Test' ? "active": ""}`}
          onClick = {() => setActiveTab('Test')}
        >
          Test
        </button>
      </div>

      {/*Big 5 Test tab*/}
      <div className = 'big5-layout'>
        
        {/*Main table*/}
        <div className = "big5-main-content">
          <table className = "big5-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Base Model</th>
                <th>Openness (O)</th>
                <th>Conscientiousness (C)</th>
                <th>Extraversion (E)</th>
                <th>Agreeableness (A)</th>
                <th>Neuroticism (N)</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>

        </div>

      </div>

    </div>
  )
}
