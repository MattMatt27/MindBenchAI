import "../styles/Leaderboard.css";
import { useState, useMemo, useRef, useEffect, MouseEvent, KeyboardEvent } from "react";
import type { ChangeEvent } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  Row,
} from "@tanstack/react-table";
import {
  getLatestVersions,
  modelVersions,
  filterVersions,
  systemPrompts,
  messagePrompts,
  modelFamilies
} from "../data/leaderboardData";

interface InfoBubbleProps {
  title: string;
  content: string;
}

interface ModelVersion {
  id: string;
  modelFamily: string;
  model: string;
  version: string;
  SIRI_2: number;
  A_pharm: number;
  A_mamh: number;
  temperature?: number;
  top_p?: number;
  system_prompt_id?: string;
  message_prompt_id?: string;
}

interface MainRow {
  id: string;
  isMainRow: true;
  modelFamily: string;
  model: string;
  version: string;
  actualVersion: string;
  SIRI_2: number;
  A_pharm: number;
  A_mamh: number;
  hasVersions: boolean;
  versions: ModelVersion[];
}

interface VersionRow {
  id: string;
  isMainRow: false;
  parentId: string;
  modelFamily: string;
  model: string;
  version: string;
  SIRI_2: number;
  A_pharm: number;
  A_mamh: number;
  temperature?: number;
  top_p?: number;
  system_prompt_id?: string;
  message_prompt_id?: string;
}

type TableRow = MainRow | VersionRow;

interface FilterParams {
  temperature?: number;
  top_p?: number;
  system_prompt_id?: string;
  message_prompt_id?: string;
  modelFamilies?: string[];
}

function InfoBubble({ title, content }: InfoBubbleProps) {
  const [open, setOpen] = useState<boolean>(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    function handleDocClick(e: Event): void {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  return (
    <span className="lb-info-wrap" ref={wrapRef}>
      <span
        className="lb-info"
        role="button"
        tabIndex={0}
        aria-label={`${title} details`}
        aria-expanded={open}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        !
      </span>
      {open && (
        <div role="dialog" aria-label={title} className="lb-popover">
          <div className="lb-popover-title">{title}</div>
          <div className="lb-popover-body">{content}</div>
        </div>
      )}
    </span>
  );
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<string>("models");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [expandedModels, setExpandedModels] = useState<Set<string>>(() => new Set());
  const [selectedVersions, setSelectedVersions] = useState<Set<string>>(() => new Set());

  const [temperatureFilter, setTemperatureFilter] = useState<string>("");
  const [topPFilter, setTopPFilter] = useState<string>("");
  const [systemPromptFilter, setSystemPromptFilter] = useState<string>("");
  const [messagePromptFilter, setMessagePromptFilter] = useState<string>("");
  const [modelFamilyFilter, setModelFamilyFilter] = useState<string[]>([]);

  const toggleVersion = (versionId: string): void => {
    setSelectedVersions((prev) => {
      const next = new Set(prev);
      next.has(versionId) ? next.delete(versionId) : next.add(versionId);
      return next;
    });
  };

  const clearAllSelected = (): void => setSelectedVersions(new Set());

  const sortedMainRows = useMemo<MainRow[]>(() => {
    const filters: FilterParams = {
      temperature: temperatureFilter ? parseFloat(temperatureFilter) : undefined,
      top_p: topPFilter ? parseFloat(topPFilter) : undefined,
      system_prompt_id: systemPromptFilter || undefined,
      message_prompt_id: messagePromptFilter || undefined,
      modelFamilies: modelFamilyFilter.length > 0 ? modelFamilyFilter : undefined,
    };

    let filtered = filterVersions(modelVersions as ModelVersion[], filters);

    if (filters.modelFamilies) {
      filtered = filtered.filter(v => filters.modelFamilies!.includes(v.modelFamily));
    }

    const modelMap: Record<string, { latest: ModelVersion | null; versions: ModelVersion[] }> = {};

    filtered.forEach(v => {
      const key = `${v.modelFamily}-${v.model}`;
      if (!modelMap[key]) {
        modelMap[key] = {
          latest: null,
          versions: []
        };
      }

      if (!modelMap[key].latest || v.version > modelMap[key].latest!.version) {
        modelMap[key].latest = v;
      }
      modelMap[key].versions.push(v);
    });

    const mainRows: MainRow[] = Object.entries(modelMap).map(([key, data]) => {
      const latest = data.latest!;
      const mainRowId = `main-${key}`;

      return {
        id: mainRowId,
        isMainRow: true,
        modelFamily: latest.modelFamily,
        model: latest.model,
        version: 'Latest',
        actualVersion: latest.version,
        SIRI_2: latest.SIRI_2,
        A_pharm: latest.A_pharm,
        A_mamh: latest.A_mamh,
        hasVersions: data.versions.length >= 1,
        versions: data.versions
      };
    });

    if (sorting.length > 0) {
      const { id: sortColumn, desc } = sorting[0];
      mainRows.sort((a, b) => {
        const aVal = a[sortColumn as keyof MainRow];
        const bVal = b[sortColumn as keyof MainRow];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return desc ? bVal - aVal : aVal - bVal;
        }

        const aStr = String(aVal || "").toLowerCase();
        const bStr = String(bVal || "").toLowerCase();
        return desc ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
      });
    }

    return mainRows;
  }, [temperatureFilter, topPFilter, systemPromptFilter, messagePromptFilter, modelFamilyFilter, sorting]);

  const data = useMemo<TableRow[]>(() => {
    const rows: TableRow[] = [];

    sortedMainRows.forEach(mainRow => {
      rows.push(mainRow);

      if (expandedModels.has(mainRow.id) && mainRow.hasVersions) {
        mainRow.versions
          .sort((a, b) => b.version.localeCompare(a.version))
          .forEach(v => {
            rows.push({
              id: v.id,
              isMainRow: false,
              parentId: mainRow.id,
              modelFamily: v.modelFamily,
              model: v.model,
              version: v.version,
              SIRI_2: v.SIRI_2,
              A_pharm: v.A_pharm,
              A_mamh: v.A_mamh,
              temperature: v.temperature,
              top_p: v.top_p,
              system_prompt_id: v.system_prompt_id,
              message_prompt_id: v.message_prompt_id
            });
          });
      }
    });

    return rows;
  }, [sortedMainRows, expandedModels]);

  const toggleRow = (id: string): void => {
    setExpandedModels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        id: "expander",
        header: () => "",
        size: 30,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          if (!row.original.isMainRow) {
            const isSelected = selectedVersions.has(row.original.id);
            return (
              <div className="lb-checkbox-cell">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleVersion(row.original.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          }

          if (!row.original.hasVersions) return null;

          const isOpen = expandedModels.has(row.original.id);
          return (
            <button
              className={`lb-expander ${isOpen ? "open" : ""}`}
              aria-label={isOpen ? "Collapse row" : "Expand row"}
              aria-expanded={isOpen}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                toggleRow(row.original.id);
              }}
              type="button"
            >
              ▸
            </button>
          );
        },
      },
      {
        accessorKey: "modelFamily",
        header: () => "Model Family",
        cell: (info) => info.getValue()
      },
      {
        accessorKey: "model",
        header: () => "Model",
        cell: (info) => info.getValue()
      },
      {
        accessorKey: "version",
        header: () => "Version",
        cell: (info) => info.getValue(),
        size: 100
      },
      {
        accessorKey: "SIRI_2",
        header: () => (
          <div className="lb-col-header">
            SIRI-2
            <InfoBubble
              title="SIRI-2"
              content="RMSE — lower is better. This score reflects error across the SIRI-2 benchmark."
            />
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue() as number;
          return typeof v === "number" ? v.toFixed(3) : v;
        },
      },
      {
        accessorKey: "A_pharm",
        header: () => (
          <div className="lb-col-header">
            A-Pharm
            <InfoBubble
              title="A-Pharm"
              content="RMSE — lower is better. Pharmacology subset performance."
            />
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue() as number;
          return typeof v === "number" ? v.toFixed(3) : v;
        },
      },
      {
        accessorKey: "A_mamh",
        header: () => (
          <div className="lb-col-header">
            A-MaMH
            <InfoBubble
              title="A-MaMH"
              content="RMSE — lower is better. Math & reasoning subset performance."
            />
          </div>
        ),
        cell: ({ getValue }) => {
          const v = getValue() as number;
          return typeof v === "number" ? v.toFixed(3) : v;
        },
      },
    ],
    [expandedModels, selectedVersions]
  );

  const table = useReactTable<TableRow>({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    manualSorting: true,
    globalFilterFn: (row, _colId, filterValue) => {
      if (!filterValue) return true;
      const q = String(filterValue).toLowerCase();
      const family = String(row.original.modelFamily || "").toLowerCase();
      const model = String(row.original.model || "").toLowerCase();
      const version = String(row.original.version || "").toLowerCase();
      return family.includes(q) || model.includes(q) || version.includes(q);
    },
  });

  const comparisonRows = useMemo<ModelVersion[]>(
    () => (modelVersions as ModelVersion[]).filter((v) => selectedVersions.has(v.id)),
    [selectedVersions]
  );

  return (
    <div className="lb-container">
      <div className="g-tabs">
        <button
          className={`g-tab-bttn ${activeTab === "models" ? "active" : ""}`}
          onClick={() => setActiveTab("models")}
          type="button"
        >
          Models
        </button>
        <button
          className={`g-tab-bttn ${activeTab === "versions" ? "active" : ""}`}
          onClick={() => setActiveTab("versions")}
          type="button"
          aria-label={`Open Comparison tab with ${selectedVersions.size} selected`}
        >
          Comparison{selectedVersions.size ? ` (${selectedVersions.size})` : ""}
        </button>
      </div>

      {activeTab === "models" && (
        <div className="lb-layout">
          <aside className="lb-sidebar">
            <div className="lb-search">
              <div className="lb-search-island">
                <input
                  className="lb-search-input"
                  value={globalFilter ?? ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="lb-filter-section">
              <div className="lb-filter-group">
                <label className="lb-filter-heading" htmlFor="modelFamilyFilter">
                  Model Family
                </label>
                <div className="lb-multiselect">
                  {Object.keys(modelFamilies).map(family => (
                    <label key={family} className="lb-checkbox-label">
                      <input
                        type="checkbox"
                        checked={modelFamilyFilter.includes(family)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setModelFamilyFilter(prev => [...prev, family]);
                          } else {
                            setModelFamilyFilter(prev => prev.filter(f => f !== family));
                          }
                        }}
                      />
                      {family}
                    </label>
                  ))}
                </div>
              </div>

              <h3 className="lb-filter-title">Experiment Parameters</h3>

              <div className="lb-filter-group">
                <label className="lb-filter-heading" htmlFor="temperatureFilter">
                  Temperature
                </label>
                <select
                  id="temperatureFilter"
                  className="lb-select"
                  value={temperatureFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setTemperatureFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="0.3">0.3</option>
                  <option value="0.5">0.5</option>
                  <option value="0.7">0.7</option>
                  <option value="1.0">1.0</option>
                </select>
              </div>

              <div className="lb-filter-group">
                <label className="lb-filter-heading" htmlFor="topPFilter">
                  Top P
                </label>
                <select
                  id="topPFilter"
                  className="lb-select"
                  value={topPFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setTopPFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="0.9">0.9</option>
                  <option value="0.95">0.95</option>
                  <option value="1.0">1.0</option>
                </select>
              </div>

              <div className="lb-filter-group">
                <label className="lb-filter-heading" htmlFor="systemPromptFilter">
                  System Prompt
                </label>
                <select
                  id="systemPromptFilter"
                  className="lb-select"
                  value={systemPromptFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSystemPromptFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {systemPrompts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {systemPromptFilter && (
                  <div className="lb-prompt-text">
                    {systemPrompts.find(p => p.id === systemPromptFilter)?.content}
                  </div>
                )}
              </div>

              <div className="lb-filter-group">
                <label className="lb-filter-heading" htmlFor="messagePromptFilter">
                  Message Prompt
                </label>
                <select
                  id="messagePromptFilter"
                  className="lb-select"
                  value={messagePromptFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setMessagePromptFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {messagePrompts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {messagePromptFilter && (
                  <div className="lb-prompt-text">
                    {messagePrompts.find(p => p.id === messagePromptFilter)?.content}
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="lb-main-content">
            <div className="lb-table-container">
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
                    const isMainRow = row.original.isMainRow;
                    const isVersionRow = !isMainRow;
                    const isSelected = isVersionRow && selectedVersions.has(row.original.id);

                    return (
                      <tr
                        key={row.id}
                        className={`
                          ${isMainRow ? 'lb-main-row' : 'lb-version-row'}
                          ${isSelected ? 'selected' : ''}
                        `}
                        onClick={isVersionRow ? () => toggleVersion(row.original.id) : undefined}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {table.getRowModel().rows.length === 0 && (
                <div className="lb-empty">No results match the current filters.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "versions" && (
        <div className="lb-layout no-sidebar">
          <div className="lb-comparison-content">
            <div className="lb-comparison-header">
              <h2>Version Comparison</h2>
              {selectedVersions.size > 0 && (
                <button className="lb-button" onClick={clearAllSelected} type="button">
                  Clear all
                </button>
              )}
            </div>

            {comparisonRows.length ? (
              <div className="lb-table-container">
                <table className="lb-table">
                  <thead>
                    <tr>
                      <th style={{width: 50}}>Keep</th>
                      <th>Model Family</th>
                      <th>Model</th>
                      <th>Version</th>
                      <th>
                        <div className="lb-col-header">
                          SIRI-2
                          <InfoBubble
                            title="SIRI-2"
                            content="RMSE — lower is better. This score reflects error across the SIRI-2 benchmark."
                          />
                        </div>
                      </th>
                      <th>
                        <div className="lb-col-header">
                          A-Pharm
                          <InfoBubble
                            title="A-Pharm"
                            content="RMSE — lower is better. Pharmacology subset performance."
                          />
                        </div>
                      </th>
                      <th>
                        <div className="lb-col-header">
                          A-MaMH
                          <InfoBubble
                            title="A-MaMH"
                            content="RMSE — lower is better. Math & reasoning subset performance."
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked
                            onChange={() => toggleVersion(v.id)}
                          />
                        </td>
                        <td>{v.modelFamily}</td>
                        <td>{v.model}</td>
                        <td>{v.version}</td>
                        <td>{typeof v.SIRI_2 === "number" ? v.SIRI_2.toFixed(3) : v.SIRI_2}</td>
                        <td>{typeof v.A_pharm === "number" ? v.A_pharm.toFixed(3) : v.A_pharm}</td>
                        <td>{typeof v.A_mamh === "number" ? v.A_mamh.toFixed(3) : v.A_mamh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="lb-empty">No versions selected. Select versions from the Models tab to compare.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
