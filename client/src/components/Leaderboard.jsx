import "../styles/Leaderboard.css";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { leaderboard as leaderboardData, leaderboard_ext } from "../data/models";

const numberRange = (row, columnId, [min, max]) => {
  const v = row.getValue(columnId);
  if (typeof v !== "number" || Number.isNaN(v)) return true;
  const minNum = min === "" || min === undefined ? undefined : Number(min);
  const maxNum = max === "" || max === undefined ? undefined : Number(max);
  if (minNum !== undefined && !Number.isNaN(minNum) && v < minNum) return false;
  if (maxNum !== undefined && !Number.isNaN(maxNum) && v > maxNum) return false;
  return true;
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = React.useState("models");
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [baseModelFilter, setBaseModelFilter] = React.useState("");
  const [expanded, setExpanded] = React.useState(() => new Set());

  const [selectedSnapshots, setSelectedSnapshots] = React.useState(() => new Set());

  const toggleSnapshot = (snapshotId) => {
    setSelectedSnapshots((prev) => {
      const next = new Set(prev);
      next.has(snapshotId) ? next.delete(snapshotId) : next.add(snapshotId);
      return next;
    });
  };

  const clearAllSelected = () => setSelectedSnapshots(new Set());

  const data = React.useMemo(() => leaderboardData, []);
  const baseModels = React.useMemo(
    () => Array.from(new Set(data.map((r) => r.baseModel))).sort(),
    [data]
  );
  const displayData = React.useMemo(
    () =>
      baseModelFilter
        ? data.filter((r) => String(r.baseModel) === String(baseModelFilter))
        : data,
    [data, baseModelFilter]
  );

  React.useEffect(() => {
    setExpanded(new Set());
  }, [baseModelFilter, globalFilter]);

  const toggleRow = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        header: () => "",
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const id = row.original.model;
          const isOpen = expanded.has(id);
          const panelId = `detail-${id.replace(/\s+/g, "_")}`;
          return (
            <button
              className={`lb-expander ${isOpen ? "open" : ""}`}
              aria-label={isOpen ? "Collapse row" : "Expand row"}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={(e) => {
                e.stopPropagation();
                toggleRow(id);
              }}
              type="button"
            >
              ▸
            </button>
          );
        },
      },
      { accessorKey: "model", header: () => "Model", cell: (info) => info.getValue() },
      { accessorKey: "baseModel", header: () => "Base Model", cell: (info) => info.getValue() },
      {
        accessorKey: "SIRI_2",
        header: () => (
          <div className="lb-col-header">
            SIRI_2
            <a
              href="/docs/siri2"
              className="lb-info"
              target="_blank"
              rel="noopener noreferrer"
              title="Learn more about SIRI_2"
            >
              !
            </a>
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue();
          return typeof v === "number" ? v.toFixed(3) : v;
        },
        filterFn: numberRange,
      },
      {
        accessorKey: "A_pharm",
        header: () => (
          <div className="lb-col-header">
            A_pharm
            <a
              href="/docs/a_pharm"
              className="lb-info"
              target="_blank"
              rel="noopener noreferrer"
              title="Learn more about A_pharm"
            >
              !
            </a>
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue();
          return typeof v === "number" ? v.toFixed(3) : v;
        },
        filterFn: numberRange,
      },
      {
        accessorKey: "A_mamh",
        header: () => (
          <div className="lb-col-header">
            A_mamh
            <a
              href="/docs/a_mamh"
              className="lb-info"
              target="_blank"
              rel="noopener noreferrer"
              title="Learn more about A_mamh"
            >
              !
            </a>
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue();
          return typeof v === "number" ? v.toFixed(3) : v;
        },
        filterFn: numberRange,
      },
    ],
    [expanded]
  );

  const table = useReactTable({
    data: displayData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _colId, filterValue) => {
      if (!filterValue) return true;
      const q = String(filterValue).toLowerCase();
      const model = String(row.original.model || "").toLowerCase();
      const base = String(row.original.baseModel || "").toLowerCase();
      const snaps = Array.isArray(row.original.snapshot)
        ? row.original.snapshot.map((s) => String(s).toLowerCase())
        : [];
      return model.includes(q) || base.includes(q) || snaps.some((s) => s.includes(q));
    },
  });

  const getRange = (colId) => table.getColumn(colId)?.getFilterValue() ?? ["", ""];
  const setRange = (colId, idx, val) => {
    const curr = table.getColumn(colId)?.getFilterValue() ?? ["", ""];
    const next = [...curr];
    next[idx] = val;
    table.getColumn(colId)?.setFilterValue(next);
  };

  // Build comparison rows from selected snapshot ids
  const comparisonRows = React.useMemo(
    () => leaderboard_ext.filter((s) => selectedSnapshots.has(s.snapshot)),
    [selectedSnapshots]
  );

  return (
    <div>
      <div className="lb-tabs">
        <button
          className={`lb-tab ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          type="button"
        >
          Models
        </button>
        <button
          className={`lb-tab ${activeTab === "snapshots" ? "active" : ""}`}
          onClick={() => setActiveTab("snapshots")}
          type="button"
          aria-label={`Open Comparison tab with ${selectedSnapshots.size} selected`}
        >
          Comparison{selectedSnapshots.size ? ` (${selectedSnapshots.size})` : ""}
        </button>
      </div>

      {activeTab === "models" && (
        <div className="lb-layout">
          <aside className="lb-island lb-sidebar">
            <div className="lb-search">
              <input
                className="lb-search-input"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search model, base model, or snapshot"
              />
            </div>

            <div className="lb-filter-group">
              <label className="lb-filter-heading" htmlFor="baseModelFilter">
                Filter by Base Model
              </label>
              <select
                id="baseModelFilter"
                className="lb-select"
                value={baseModelFilter}
                onChange={(e) => setBaseModelFilter(e.target.value)}
              >
                <option value="">All</option>
                {baseModels.map((bm) => (
                  <option key={bm} value={bm}>
                    {bm}
                  </option>
                ))}
              </select>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">SIRI_2</div>
              <div className="lb-range">
                <input
                  type="number"
                  placeholder="Min"
                  step="0.001"
                  value={getRange("SIRI_2")[0]}
                  onChange={(e) => setRange("SIRI_2", 0, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  step="0.001"
                  value={getRange("SIRI_2")[1]}
                  onChange={(e) => setRange("SIRI_2", 1, e.target.value)}
                />
              </div>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">A_pharm</div>
              <div className="lb-range">
                <input
                  type="number"
                  placeholder="Min"
                  step="0.001"
                  value={getRange("A_pharm")[0]}
                  onChange={(e) => setRange("A_pharm", 0, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  step="0.001"
                  value={getRange("A_pharm")[1]}
                  onChange={(e) => setRange("A_pharm", 1, e.target.value)}
                />
              </div>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">A_mamh</div>
              <div className="lb-range">
                <input
                  type="number"
                  placeholder="Min"
                  step="0.001"
                  value={getRange("A_mamh")[0]}
                  onChange={(e) => setRange("A_mamh", 0, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  step="0.001"
                  value={getRange("A_mamh")[1]}
                  onChange={(e) => setRange("A_mamh", 1, e.target.value)}
                />
              </div>
            </div>
          </aside>

          <div className="lb-island table-wrap">
            <table className="lb-table">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => {
                      const canSort = header.column.getCanSort();
                      const sortDir = header.column.getIsSorted();
                      return (
                        <th
                          key={header.id}
                          className={canSort ? "sortable" : undefined}
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          style={header.column.id === "expander" ? { width: 40 } : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && sortDir && (
                            <span className="sort-indicator">
                              {sortDir === "asc" ? "▲" : "▼"}
                            </span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const id = row.original.model;
                  const isOpen = expanded.has(id);
                  const colSpan = table.getAllLeafColumns().length;
                  const panelId = `detail-${id.replace(/\s+/g, "_")}`;

                  // Filter leaderboard_ext to snapshots relevant to this model (if any listed)
                  const relevantSnapshots = Array.isArray(row.original.snapshot)
                    ? leaderboard_ext.filter((ext) =>
                        row.original.snapshot.includes(ext.snapshot)
                      )
                    : leaderboard_ext;

                  return (
                    <React.Fragment key={id}>
                      <tr>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>

                      {isOpen && (
                        <tr className="lb-detail-row">
                          <td id={panelId} colSpan={colSpan}>
                            <div className="lb-detail">
                              <div className="lb-detail-title">Available snapshots</div>
                              
                              <table className="lb-subtable">
                                <thead>
                                  <tr>
                                    <th style={{ width: 36, textAlign: "center" }} aria-label="Select column">Select</th>
                                    <th>Snapshot</th>
                                    <th>SIRI_2</th>
                                    <th>A_pharm</th>
                                    <th>A_mamh</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {relevantSnapshots.length ? (
                                    relevantSnapshots.map((s) => {
                                      const checked = selectedSnapshots.has(s.snapshot);
                                      const checkboxId = `chk-${s.snapshot.replace(/\s+/g, "_")}`;
                                      return (
                                        <tr key={s.snapshot}>
                                          <td style={{ textAlign: "center" }}>
                                            <input
                                              id={checkboxId}
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => toggleSnapshot(s.snapshot)}
                                              aria-label={`Select ${s.snapshot} for comparison`}
                                            />
                                          </td>
                                          <td>
                                            <label htmlFor={checkboxId} style={{ cursor: "pointer" }}>
                                              {s.snapshot}
                                            </label>
                                          </td>
                                          <td>{typeof s.SIRI_2 === "number" ? s.SIRI_2.toFixed(3) : s.SIRI_2}</td>
                                          <td>{typeof s.A_pharm === "number" ? s.A_pharm.toFixed(3) : s.A_pharm}</td>
                                          <td>{typeof s.A_mamh === "number" ? s.A_mamh.toFixed(3) : s.A_mamh}</td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td colSpan={5} style={{ textAlign: "center" }}>
                                        —
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {table.getRowModel().rows.length === 0 && (
              <div className="lb-empty">No results match the current filters.</div>
            )}
          </div>
        </div>
      )}

    {activeTab === "snapshots" && (
      <div className="lb-layout full">
        <div className="lb-island table-wrap table-scroll full">
          <div className="lb-detail-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Comparison</span>
            {selectedSnapshots.size > 0 && (
              <button className="lb-button" onClick={clearAllSelected} type="button">
                Clear all
              </button>
            )}
          </div>

          {comparisonRows.length ? (
            <table className="lb-table cmp-table">
              <thead>
                <tr>
                  <th className="keep-col">Keep</th>
                  <th className="snap-col">Snapshot</th>
                  <th>SIRI_2</th>
                  <th>A_pharm</th>
                  <th>A_mamh</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((s) => {
                  const checkboxId = `cmp-${s.snapshot.replace(/\s+/g, "_")}`;
                  return (
                    <tr key={`cmp-${s.snapshot}`}>
                      <td className="keep-col">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked
                          onChange={() => toggleSnapshot(s.snapshot)}
                        />
                      </td>
                      <td className="snap-col">
                        <label htmlFor={checkboxId} style={{ cursor: "pointer" }}>
                          {s.snapshot}
                        </label>
                      </td>
                      <td>{typeof s.SIRI_2 === "number" ? s.SIRI_2.toFixed(3) : s.SIRI_2}</td>
                      <td>{typeof s.A_pharm === "number" ? s.A_pharm.toFixed(3) : s.A_pharm}</td>
                      <td>{typeof s.A_mamh === "number" ? s.A_mamh.toFixed(3) : s.A_mamh}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="lb-empty">No models selected yet. Select to compare from the Models tab.</div>
          )}
        </div>
      </div>
    )}
    </div>
  );
}
