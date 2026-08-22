import { useState, useEffect } from 'react';
import { PRESENTATION_DATA_MODE, type DepartmentConfig, type ScreenshotView } from '../config/presentation.config';
import {
  CheckCircle2,
  Globe,
  Activity,
  Layers,
  Image as ImageIcon,
  LayoutGrid,
  Info,
  Maximize2,
  X
} from 'lucide-react';

interface SimulatedERPScreenProps {
  department: DepartmentConfig;
  activeHotspotId: string | null;
  onSelectHotspot: (id: string | null) => void;
}

export function SimulatedERPScreen({
  department,
  activeHotspotId,
  onSelectHotspot
}: SimulatedERPScreenProps) {
  const [selectedSubScreenIndex, setSelectedSubScreenIndex] = useState(0);
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const subScreens = department.showcase.subScreens || [];
  const currentSubScreen: ScreenshotView = subScreens[selectedSubScreenIndex] || {
    id: 'primary',
    label: department.showcase.mockTitle,
    filename: department.showcase.primaryScreenshot,
    description: department.showcase.mockSubtitle,
    hotspots: []
  };

  // Check if image file exists / loads properly
  useEffect(() => {
    const img = new Image();
    img.src = currentSubScreen.filename;
    img.onload = () => {
      setImageExists(true);
    };
    img.onerror = () => {
      setImageExists(false);
    };
  }, [currentSubScreen.filename]);

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans select-none">
      {/* Sub-screens Selector Tab Bar */}
      {subScreens.length > 1 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 shrink-0">
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">SCREEN VIEWS:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {subScreens.map((screen, idx) => {
              const isSelected = selectedSubScreenIndex === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    setSelectedSubScreenIndex(idx);
                    onSelectHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden md:block">
            {imageExists ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> LIVE SCREENSHOT LOADED
              </span>
            ) : (
              <span className="text-cyan-400/80 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> HIGH-DENSITY SIMULATION
              </span>
            )}
          </div>
        </div>
      )}

      {/* Top ERP Browser Chrome Header */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-3 truncate max-w-xs sm:max-w-md">
            core360-erp.enterprise.internal{department.liveErp.deepLinkRoute}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {imageExists && (
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/40 transition-colors cursor-pointer"
              title="Open full resolution screenshot modal"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Zoom Screenshot</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {PRESENTATION_DATA_MODE === 'live' ? 'LIVE ERP DATA' : 'DEMO DATA'}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {department.code}
          </span>
        </div>
      </div>

      {/* Main ERP Cockpit Area (Either Screenshot or High-Density Interactive Simulation) */}
      <div className="relative min-h-[520px] flex overflow-hidden">
        {imageExists ? (
          /* Actual Screenshot Rendered with Hotspot Overlay */
          <div className="relative w-full h-[520px] bg-slate-950 overflow-hidden group">
            <img
              src={currentSubScreen.filename}
              alt={currentSubScreen.label}
              className="w-full h-full object-contain bg-slate-950"
            />

            {/* Hotspots Overlay on Screenshot */}
            {currentSubScreen.hotspots.map((hs) => {
              const isSelected = activeHotspotId === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <button
                    onClick={() => onSelectHotspot(isSelected ? null : hs.id)}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full border shadow-lg transition-all duration-300 ${
                      isSelected
                        ? 'bg-cyan-500 text-black border-white scale-125'
                        : 'bg-slate-900/90 text-cyan-400 border-cyan-500/60 hover:scale-110 hover:border-cyan-300'
                    }`}
                  >
                    <span className="animate-ping absolute inset-0 rounded-full bg-cyan-400 opacity-40" />
                    <span className="text-xs font-black">●</span>
                  </button>

                  {/* Hotspot Callout Bubble */}
                  {isSelected && (
                    <div className="absolute left-10 top-0 w-64 p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500 shadow-2xl backdrop-blur-md z-40 pointer-events-auto">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{hs.title}</span>
                        {hs.kpi && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
                            {hs.kpi}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {hs.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* High-Fidelity Simulated ERP UI (Graceful Fallback while Screenshots are added) */
          <div className="flex-1 flex overflow-hidden">
            {/* Left Side Navigation Sidebar */}
            <div className="w-52 bg-slate-900/70 border-r border-slate-800/80 p-3.5 flex flex-col justify-between hidden md:flex">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2 py-1">
                  ERP Suite
                </div>
                <div className="px-2.5 py-2 rounded-xl bg-cyan-950/70 text-cyan-400 font-bold text-xs flex items-center gap-2 border border-cyan-500/30">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{department.name.split(',')[0]}</span>
                </div>
                <div className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Operations & Ledger</span>
                </div>
                <div className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Audit Trail</span>
                </div>
              </div>

              {/* Notice that screenshots can be dropped in */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-amber-300 font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Screenshot Ready</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Drop image into: <br />
                  <span className="text-cyan-400">{currentSubScreen.filename}</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 overflow-y-auto relative">
              {/* Department Specific Header in ERP */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-5 gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{currentSubScreen.label || department.showcase.mockTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentSubScreen.description || department.showcase.mockSubtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  {department.showcase.quickStats.map((st, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
                      <div className="text-[10px] text-slate-400">{st.label}</div>
                      <div className="text-xs font-bold text-cyan-400">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Simulated Cards based on Department */}
              {department.id === 'crm' && (
                <div className="space-y-4 mb-4">
                  {/* 4 Feature Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-mono font-bold text-amber-400">1. LEAD MANAGEMENT</div>
                      <div className="text-xs font-bold text-white mt-1">Create & Track Leads</div>
                      <div className="text-[10px] text-slate-300 mt-0.5">Create, update, assign and track leads.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">2. SALES PIPELINE</div>
                      <div className="text-xs font-bold text-white mt-1">Dashboard Stages</div>
                      <div className="text-[10px] text-slate-300 mt-0.5">Manage sales stages using a dashboard.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">3. OFFERS</div>
                      <div className="text-xs font-bold text-white mt-1">Customer Offers</div>
                      <div className="text-[10px] text-slate-300 mt-0.5">Create and manage customer offers.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[10px] uppercase font-mono font-bold text-purple-400">4. SALES WORKFLOW</div>
                      <div className="text-xs font-bold text-white mt-1">Lead → Sale</div>
                      <div className="text-[10px] text-slate-300 mt-0.5">Lead → Qualification → Offer → Sale</div>
                    </div>
                  </div>

                  {/* Visual Sales Pipeline Stages */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-slate-300">SALES WORKFLOW PIPELINE</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
                        My Role: CRM Frontend + Backend
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="font-bold text-amber-400 text-xs">1. Lead</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">New Prospect</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="font-bold text-cyan-400 text-xs">2. Qualification</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Requirements</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="font-bold text-purple-400 text-xs">3. Offer</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Quotation Sent</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <div className="font-bold text-emerald-400 text-xs">4. Sale</div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">Deal Closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {department.id === 'hrm' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Active Staff Directory</div>
                    <div className="text-2xl font-black text-purple-400 mt-1">84 Employees</div>
                    <div className="text-[10px] text-purple-400 mt-1">Across 6 enterprise suites</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Time to Hire (ATS)</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">14.2 Days</div>
                    <div className="text-[10px] text-slate-400 mt-1">6 Open requisitions</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Leave Request Clearance</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">98.1%</div>
                    <div className="text-[10px] text-cyan-500 mt-1">Automated ESS approval</div>
                  </div>
                </div>
              )}

              {department.id === 'payroll' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">1. GENERAL LEDGER</div>
                    <div className="text-xs font-bold text-white mt-1">Multi-Currency</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Automated double-entry bookkeeping & real-time P&L.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">2. AR & AP</div>
                    <div className="text-xs font-bold text-white mt-1">Invoice & Bills</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Automated payment reminders and reconciliation.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400">3. TAX & COMPLIANCE</div>
                    <div className="text-xs font-bold text-white mt-1">VAT & Tax Rules</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Exportable audit-ready financial reports.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-purple-400">4. CASH FLOW</div>
                    <div className="text-xs font-bold text-white mt-1">Expense Tracking</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Dynamic cash flow forecasting dashboards.</div>
                  </div>
                </div>
              )}

              {department.id === 'support' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">1. MULTI-WAREHOUSE</div>
                    <div className="text-xs font-bold text-white mt-1">Location Control</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Centralized stock levels across multiple facilities.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">2. SKU & EXPIRY</div>
                    <div className="text-xs font-bold text-white mt-1">Batch Tracking</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Serial numbers, barcodes, and automated expiry alerts.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400">3. STOCK ALERTS</div>
                    <div className="text-xs font-bold text-white mt-1">Dynamic Reorder</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Low-stock notifications & auto purchase triggers.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-purple-400">4. VALUATION</div>
                    <div className="text-xs font-bold text-white mt-1">FIFO / LIFO</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Standard costing methods integrated with GL.</div>
                  </div>
                </div>
              )}

              {department.id === 'marketing' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-rose-400">1. PROCUREMENT</div>
                    <div className="text-xs font-bold text-white mt-1">RFQ & PO Workflow</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Vendor comparison matrices and multi-tier approvals.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">2. SUPPLIER HUB</div>
                    <div className="text-xs font-bold text-white mt-1">Scorecards</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">On-time delivery, quality ratings & pricing history.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400">3. QC & GRN</div>
                    <div className="text-xs font-bold text-white mt-1">Goods Receipt</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Digital GRN logging with pass/fail QC inspection.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">4. DEMAND PLAN</div>
                    <div className="text-xs font-bold text-white mt-1">Replenishment</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Lead-time analytics & predictive demand planning.</div>
                  </div>
                </div>
              )}

              {department.id === 'executive' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-amber-400">1. ACTION DASHBOARD</div>
                    <div className="text-xs font-bold text-white mt-1">Assigned Tasks</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Pending approvals, deadlines & role-specific metrics.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">2. SELF-SERVICE HR</div>
                    <div className="text-xs font-bold text-white mt-1">Clock-In & Leaves</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Timesheet tracking, payroll slips & expense claims.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-cyan-400">3. COLLABORATION</div>
                    <div className="text-xs font-bold text-white mt-1">Internal Comms</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Announcements, cross-department notifications & feeds.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] uppercase font-mono font-bold text-purple-400">4. APPROVAL HUB</div>
                    <div className="text-xs font-bold text-white mt-1">1-Click Approvals</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">One-click approval for POs, invoices & authorizations.</div>
                  </div>
                </div>
              )}

              {/* Simulated Data Table Records */}
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
                <div className="px-4 py-3 bg-slate-800/40 border-b border-slate-800 flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>Core 360 Live Transaction Ledger & Feed</span>
                  <span className="text-[11px] font-mono text-cyan-400">RECORD ID: {department.liveErp.demoRecordId}</span>
                </div>
                <div className="divide-y divide-slate-800/60 text-xs">
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-200 font-medium">Core 360 Event-Driven State Synchronized across 6 Modules</span>
                    </div>
                    <span className="text-slate-400 font-mono">0.3s ago</span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-200 font-medium">RBAC Security Policy Validated :: Session Authenticated</span>
                    </div>
                    <span className="text-slate-400 font-mono">1.1s ago</span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-200 font-medium">Cryptographic Audit Entry Recorded in Master MongoDB Collection</span>
                    </div>
                    <span className="text-slate-400 font-mono">2.4s ago</span>
                  </div>
                </div>
              </div>

              {/* Interactive Hotspots for Simulated View */}
              {currentSubScreen.hotspots.map((hs) => {
                const isSelected = activeHotspotId === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      onClick={() => onSelectHotspot(isSelected ? null : hs.id)}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border shadow-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-cyan-500 text-black border-white scale-125'
                          : 'bg-slate-900/90 text-cyan-400 border-cyan-500/60 hover:scale-110 hover:border-cyan-300'
                      }`}
                    >
                      <span className="animate-ping absolute inset-0 rounded-full bg-cyan-400 opacity-40" />
                      <span className="text-xs font-black">●</span>
                    </button>

                    {/* Hotspot Callout Bubble */}
                    {isSelected && (
                      <div className="absolute left-10 top-0 w-64 p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500 shadow-2xl backdrop-blur-md z-40 pointer-events-auto">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{hs.title}</span>
                          {hs.kpi && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
                              {hs.kpi}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {hs.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Full Resolution Screenshot Lightbox Modal */}
      {isLightboxOpen && imageExists && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-bold text-white tracking-wide">
                  {currentSubScreen.label} · High-Resolution Inspector
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950">
              <img
                src={currentSubScreen.filename}
                alt={currentSubScreen.label}
                className="w-auto max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-slate-800"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{department.name} · Floor 0{department.floor}</span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
