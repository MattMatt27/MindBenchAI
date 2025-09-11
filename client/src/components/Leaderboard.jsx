import "../styles/Leaderboard.css";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { leaderboard } from "../data/models";

const numberRange = (row, columnId, [min, max]) => {
  const v = row.getValue(columnId);
  if (typeof v !== "number") return true;
  if (min !== undefined && min !== "" && v < Number(min)) return false;
  if (max !== undefined && max !== "" && v > Number(max)) return false;
  return true;
};

export default function Leaderboard() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [baseModelFilter, setBaseModelFilter] = React.useState("");

  const data = React.useMemo(() => leaderboard, []);

  const baseModels = React.useMemo(
    () => Array.from(new Set(leaderboard.map((r) => r.baseModel))),
    []
  );

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: () => "ID", cell: (info) => info.getValue() },
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
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true;
      const q = String(filterValue).toLowerCase();
      return String(row.original.model).toLowerCase().includes(q);
    },
  });

  React.useEffect(() => {
    const col = table.getColumn("baseModel");
    if (!col) return;
    col.setFilterValue(baseModelFilter || undefined);
  }, [baseModelFilter, table]);

  const getRange = (colId) => table.getColumn(colId)?.getFilterValue() ?? ["", ""];
  const setRange = (colId, idx, val) => {
    const curr = table.getColumn(colId)?.getFilterValue() ?? ["", ""];
    const next = [...curr];
    next[idx] = val;
    table.getColumn(colId)?.setFilterValue(next);
  };

  return (
    <div className="lb-layout">
      <aside className="lb-island lb-sidebar">
        <div className="lb-search">
          <input
            className="lb-search-input"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by model"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.original.id ?? row.original.model}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getRowModel().rows.length === 0 && (
          <div className="lb-empty">No results match the current filters.</div>
        )}
      </div>
    </div>
  );
}
