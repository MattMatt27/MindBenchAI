import "../styles/Framework.css";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {snapshot} from "../data/models";

export default function Framework() {
  const data = React.useMemo(() => leaderboardData, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>Snapshot</h1>
      <div className = 'lb-island table-wrap'>
        <table className = 'lb-table'>
          <thead>
            <th>snapshot</th>
            <th>model</th>
            <th>base model</th>

            {/*extra info for scale*/}
            <th>
              <div className = 'lb-col-header'>
                SIRI_2
                <a
                  href = "#"
                  className = 'lb-scale-info'
                  onClick = {(e) => e.preventDefault()}
                >!</a>
              </div>     
            </th>
            <th>
              A_pharm
              <a
                href = '#'
                className = 'lb-scale-info'
                onClick = {(e) => e.preventDefault()}
              >!</a>
            </th>
            <th>
              A_mamh
              <a
                href = '#'
                className = 'lb-scale-info'
                onClick = {(e) => e.preventDefault()}
              >!</a>
            </th>
          </thead>
          <tbody>
            {snapshot.map((row) => (
              <tr key = {row.snapshot}>
                <td>{row.snapshot}</td>
                <td>{row.model}</td>
                <td>{row.baseModel}</td>
                <td>
                  {typeof row.SIRI_2 === "number"
                    ? row.SIRI_2.toFixed(3)
                    : row.SIRI_2}
                </td>
                <td>{row.A_pharm}</td>
                <td>{row.A_mamh}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {snapshot.length === 0 && (
          <div className = "lb-empty"> No data yet.</div>
        )}
    </div>
    </div>
  )
}