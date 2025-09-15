import "../styles/Leaderboard.css";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { leaderboard as leaderboardData } from "../data/models";

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

  const data = React.useMemo(() => leaderboardData, []);
  const baseModels = React.useMemo(
    () => Array.from(new Set(data.map((r) => r.baseModel))).sort(),
    [data]
  );
  const displayData = React.useMemo(
    () => (baseModelFilter ? data.filter((r) => String(r.baseModel) === String(baseModelFilter)) : data),
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
            <a href="/docs/siri2" className="lb-info" target="_blank" rel="noopener noreferrer" title="Learn more about SIRI_2">!</a>
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
            <a href="/docs/a_pharm" className="lb-info" target="_blank" rel="noopener noreferrer" title="Learn more about A_pharm">!</a>
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
            <a href="/docs/a_mamh" className="lb-info" target="_blank" rel="noopener noreferrer" title="Learn more about A_mamh">!</a>
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

  return (
    <div>
      <div className="lb-tabs">
        <button className={`lb-tab ${activeTab === "models" ? "active" : ""}`} onClick={() => setActiveTab("models")} type="button">Models</button>
        <button className={`lb-tab ${activeTab === "snapshots" ? "active" : ""}`} onClick={() => setActiveTab("snapshots")} type="button">Snapshots</button>
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
              <label className="lb-filter-heading" htmlFor="baseModelFilter">Filter by Base Model</label>
              <select
                id="baseModelFilter"
                className="lb-select"
                value={baseModelFilter}
                onChange={(e) => setBaseModelFilter(e.target.value)}
              >
                <option value="">All</option>
                {baseModels.map((bm) => (
                  <option key={bm} value={bm}>{bm}</option>
                ))}
              </select>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">SIRI_2</div>
              <div className="lb-range">
                <input type="number" placeholder="Min" step="0.001" value={getRange("SIRI_2")[0]} onChange={(e) => setRange("SIRI_2", 0, e.target.value)} />
                <input type="number" placeholder="Max" step="0.001" value={getRange("SIRI_2")[1]} onChange={(e) => setRange("SIRI_2", 1, e.target.value)} />
              </div>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">A_pharm</div>
              <div className="lb-range">
                <input type="number" placeholder="Min" step="0.001" value={getRange("A_pharm")[0]} onChange={(e) => setRange("A_pharm", 0, e.target.value)} />
                <input type="number" placeholder="Max" step="0.001" value={getRange("A_pharm")[1]} onChange={(e) => setRange("A_pharm", 1, e.target.value)} />
              </div>
            </div>

            <div className="lb-filter-group">
              <div className="lb-filter-heading">A_mamh</div>
              <div className="lb-range">
                <input type="number" placeholder="Min" step="0.001" value={getRange("A_mamh")[0]} onChange={(e) => setRange("A_mamh", 0, e.target.value)} />
                <input type="number" placeholder="Max" step="0.001" value={getRange("A_mamh")[1]} onChange={(e) => setRange("A_mamh", 1, e.target.value)} />
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
                          {canSort && sortDir && <span className="sort-indicator">{sortDir === "asc" ? "▲" : "▼"}</span>}
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
                              <div className="lb-model-badges">
                                {row.original.snapshot?.length
                                  ? row.original.snapshot.map((s) => (
                                      <span key={s} className="lb-badge">{s}</span>
                                    ))
                                  : "—"}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {table.getRowModel().rows.length === 0 && <div className="lb-empty">No results match the current filters.</div>}
          </div>
        </div>
      )}

      {activeTab === "snapshots" && (
        <div className="lb-layout">
          <h1>Available snapshot</h1>
        </div>
      )}
    </div>
  );
}
