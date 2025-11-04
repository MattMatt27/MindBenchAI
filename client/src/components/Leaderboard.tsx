import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Search, Info } from "lucide-react";
import {
  modelVersions,
  filterVersions,
  systemPrompts,
  messagePrompts,
  modelFamilies
} from "../data/leaderboardData";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<string>("models");
  const [sorting, setSorting] = useState<SortingState>([]);
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
        hasVersions: data.versions.length > 1,
        versions: data.versions
      };
    });

    return mainRows;
  }, [temperatureFilter, topPFilter, systemPromptFilter, messagePromptFilter, modelFamilyFilter]);

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
        size: 40,
        enableSorting: false,
        cell: ({ row }) => {
          if (!row.original.isMainRow) {
            const isSelected = selectedVersions.has(row.original.id);
            return (
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleVersion(row.original.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          }

          if (!row.original.hasVersions) return null;

          const isOpen = expandedModels.has(row.original.id);
          return (
            <button
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label={isOpen ? "Collapse row" : "Expand row"}
              aria-expanded={isOpen}
              onClick={(e) => {
                e.stopPropagation();
                toggleRow(row.original.id);
              }}
              type="button"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          );
        },
      },
      {
        accessorKey: "modelFamily",
        header: () => <div className="text-center">Model Family</div>,
        cell: ({ row, getValue }) => {
          if (!row.original.isMainRow) return null;
          return <span className="font-medium">{String(getValue())}</span>;
        }
      },
      {
        accessorKey: "model",
        header: () => <div className="text-center">Model</div>,
        cell: ({ row, getValue }) => {
          if (!row.original.isMainRow) return null;
          return String(getValue());
        }
      },
      {
        accessorKey: "version",
        header: () => <div className="text-center">Version</div>,
        cell: (info) => String(info.getValue()),
        size: 120
      },
      {
        accessorKey: "SIRI_2",
        header: () => (
          <div className="flex items-center justify-center gap-1">
            SIRI-2
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:bg-gray-200 p-1 rounded">
                  <Info className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>RMSE — lower is better. Error across SIRI-2 benchmark</p>
              </TooltipContent>
            </Tooltip>
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
          <div className="flex items-center justify-center gap-1">
            A-Pharm
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:bg-gray-200 p-1 rounded">
                  <Info className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>RMSE — lower is better. Pharmacology subset performance</p>
              </TooltipContent>
            </Tooltip>
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
          <div className="flex items-center justify-center gap-1">
            A-MaMH
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:bg-gray-200 p-1 rounded">
                  <Info className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>RMSE — lower is better. Math & reasoning subset performance</p>
              </TooltipContent>
            </Tooltip>
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
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-0">
        <div className="mb-8">
          <h1 className="text-gray-900 text-3xl font-semibold mb-2">Model Leaderboard</h1>
          <p className="text-gray-600">
            Compare AI model performance across mental health benchmarks
          </p>
        </div>
      </div>

      {/* Custom Tabs Implementation */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#ececf0',
            borderRadius: '0.75rem',
            padding: '3px',
            marginBottom: '1.5rem',
            height: '2.25rem'
          }}>
            <button
              onClick={() => setActiveTab('models')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '0.75rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid transparent',
                background: activeTab === 'models' ? '#fff' : 'transparent',
                color: activeTab === 'models' ? '#111827' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: 'calc(100% - 1px)'
              }}
            >
              Models
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                borderRadius: '0.75rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid transparent',
                background: activeTab === 'comparison' ? '#fff' : 'transparent',
                color: activeTab === 'comparison' ? '#111827' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s',
                height: 'calc(100% - 1px)',
                gap: '0.5rem'
              }}
            >
              Comparison
              {selectedVersions.size > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedVersions.size}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'models' && (
          <div className="mt-0">
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <div className="flex gap-6">
              {/* Sidebar Filters */}
              <Card className="w-64 p-6 h-fit flex-shrink-0" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
                <div className="space-y-6">
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      value={globalFilter ?? ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200"
                      style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Model Family */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Model Family</h3>
                  <div className="space-y-2">
                    {Object.keys(modelFamilies).map(family => (
                      <label key={family} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={modelFamilyFilter.includes(family)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setModelFamilyFilter(prev => [...prev, family]);
                            } else {
                              setModelFamilyFilter(prev => prev.filter(f => f !== family));
                            }
                          }}
                        />
                        <span className="text-sm">{family}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experiment Parameters */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-600 mb-4">
                    Experiment Parameters
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Temperature</label>
                      <Select value={temperatureFilter || "all"} onValueChange={(val) => setTemperatureFilter(val === "all" ? "" : val)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="0.3">0.3</SelectItem>
                          <SelectItem value="0.5">0.5</SelectItem>
                          <SelectItem value="0.7">0.7</SelectItem>
                          <SelectItem value="1.0">1.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Top P</label>
                      <Select value={topPFilter || "all"} onValueChange={(val) => setTopPFilter(val === "all" ? "" : val)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="0.9">0.9</SelectItem>
                          <SelectItem value="0.95">0.95</SelectItem>
                          <SelectItem value="1.0">1.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">System Prompt</label>
                      <Select value={systemPromptFilter || "all"} onValueChange={(val) => setSystemPromptFilter(val === "all" ? "" : val)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {systemPrompts.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {systemPromptFilter && systemPromptFilter !== "all" && (
                        <div className="mt-2 p-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md italic">
                          {systemPrompts.find(p => p.id === systemPromptFilter)?.content}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Message Prompt</label>
                      <Select value={messagePromptFilter || "all"} onValueChange={(val) => setMessagePromptFilter(val === "all" ? "" : val)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {messagePrompts.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {messagePromptFilter && messagePromptFilter !== "all" && (
                        <div className="mt-2 p-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md italic">
                          {messagePrompts.find(p => p.id === messagePromptFilter)?.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

              {/* Main Table */}
              <Card className="flex-1 overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
                <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead className="bg-gray-50 border-b border-gray-200" style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {table.getHeaderGroups().map((hg) => (
                      <tr key={hg.id}>
                        {hg.headers.map((header) => {
                          const canSort = header.column.getCanSort();
                          const sortDir = header.column.getIsSorted();
                          const isFirstColumn = header.id === 'expander';
                          const alignment = isFirstColumn ? 'text-left' : 'text-center';

                          return (
                            <th
                              key={header.id}
                              className={`px-4 py-3 ${alignment} text-sm font-semibold text-gray-700 ${
                                canSort ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                              }`}
                              onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                              style={{
                                width: header.column.getSize() !== 150 ? header.column.getSize() : undefined
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {canSort && sortDir && (
                                <span className="text-xs ml-2">
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
                          className={`border-b border-gray-100 transition-colors ${
                            isMainRow ? 'bg-white hover:bg-gray-50 font-medium' : 'bg-gray-50 hover:bg-gray-100'
                          } ${isSelected ? '!bg-blue-50' : ''}`}
                          style={{
                            backgroundColor: isSelected ? '#dbeafe' : isMainRow ? 'white' : '#fafafa',
                            borderBottom: '1px solid #e5e7eb',
                            cursor: isVersionRow ? 'pointer' : 'default'
                          }}
                          onClick={isVersionRow ? () => toggleVersion(row.original.id) : undefined}
                        >
                          {row.getVisibleCells().map((cell) => {
                            const isFirstColumn = cell.column.id === 'expander';
                            const alignment = isFirstColumn ? 'text-left' : 'text-center';

                            return (
                              <td key={cell.id} className={`px-4 py-3 text-sm ${alignment}`}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {table.getRowModel().rows.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    No results match the current filters.
                  </div>
                )}
                </div>
              </Card>
            </div>
          </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="mt-0">
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <Card style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
              {selectedVersions.size === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-600 mb-2">No models selected for comparison</p>
                  <p className="text-gray-500 text-sm">Select models from the Models tab to compare them</p>
                </div>
              ) : (
                <div>
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Version Comparison</h2>
                    <Button variant="outline" size="sm" onClick={clearAllSelected}>
                      Clear all
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700" style={{width: 50}}>Keep</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Model Family</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Model</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Version</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            <div className="flex items-center gap-1">
                              SIRI-2
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="hover:bg-gray-200 p-1 rounded">
                                    <Info className="w-3.5 h-3.5 text-gray-500" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>RMSE — lower is better. Error across SIRI-2 benchmark</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            <div className="flex items-center gap-1">
                              A-Pharm
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="hover:bg-gray-200 p-1 rounded">
                                    <Info className="w-3.5 h-3.5 text-gray-500" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>RMSE — lower is better. Pharmacology subset performance</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            <div className="flex items-center gap-1">
                              A-MaMH
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="hover:bg-gray-200 p-1 rounded">
                                    <Info className="w-3.5 h-3.5 text-gray-500" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>RMSE — lower is better. Math & reasoning subset performance</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((v) => (
                          <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Checkbox
                                checked
                                onCheckedChange={() => toggleVersion(v.id)}
                              />
                            </td>
                            <td className="px-4 py-3 text-sm">{v.modelFamily}</td>
                            <td className="px-4 py-3 text-sm">{v.model}</td>
                            <td className="px-4 py-3 text-sm">{v.version}</td>
                            <td className="px-4 py-3 text-sm">{typeof v.SIRI_2 === "number" ? v.SIRI_2.toFixed(3) : v.SIRI_2}</td>
                            <td className="px-4 py-3 text-sm">{typeof v.A_pharm === "number" ? v.A_pharm.toFixed(3) : v.A_pharm}</td>
                            <td className="px-4 py-3 text-sm">{typeof v.A_mamh === "number" ? v.A_mamh.toFixed(3) : v.A_mamh}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
