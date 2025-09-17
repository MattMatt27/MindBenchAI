import "../styles/Framework.css";
import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

const stest = [
  { E: 33, A: 47, C: 45, N: 18, O: 44 },
  { E: 47, A: 33, C: 18, N: 45, O: 44 }
];

{/* data format in recharts => [{trait: 'O', value: 44}, {trait: 'C', value: 18} ]*/}
function toRadarRows(single) {
  const traits = ['O', 'C', 'E', 'A', 'N'];
  return traits.map(trait => ({
    trait,
    value: single[trait] ?? 0
  }))
}
export default function Framework() {
  const activeIndex = 1;
  const data = toRadarRows(stest[activeIndex]);

  return (
    <div className = 'radar-wrapper'>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx = "50%" cy = '50%'
          outerRadius = "80%"
          data = {data}
          startAngle = {90}
          endAngle= {-270}
        >
          <PolarGrid gridType = 'polygon' />
          <PolarAngleAxis dataKey = 'trait' />
          <PolarRadiusAxis domain = {[0, 100]} />
          <Radar
            name = 'Personality'
            dataKey = 'value'
            stroke="#64748b" fill="#64748b" fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
