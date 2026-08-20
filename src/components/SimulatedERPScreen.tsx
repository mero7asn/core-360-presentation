import { useState, useEffect } from 'react';
import { PRESENTATION_DATA_MODE, type DepartmentConfig, type ScreenshotView } from '../config/presentation.config';
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Activity,
  Layers,
  Image as ImageIcon,
  LayoutGrid,
  Info
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Pipeline Value</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">$482,500</div>
                    <div className="text-[10px] text-amber-500 font-medium mt-1 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> 142 Active Deals
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Lead Conversion Rate</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">28.4%</div>
                    <div className="text-[10px] text-emerald-400 mt-1">↑ 4.2% MoM lift</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Avg Sales Velocity</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">11.4 Days</div>
                    <div className="text-[10px] text-cyan-500 mt-1">Lead-to-signed contract</div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Monthly Payroll Disbursed</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">$189,400</div>
                    <div className="text-[10px] text-emerald-400 mt-1">84 Staff Settled</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Calculated Loan Balances</div>
                    <div className="text-2xl font-black text-slate-200 mt-1">$24,800</div>
                    <div className="text-[10px] text-slate-400 mt-1">Automated installment deduct</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Audit Calculation Variance</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">0.00% Zero</div>
                    <div className="text-[10px] text-cyan-400 mt-1">0 Discrepancy flags</div>
                  </div>
                </div>
              )}

              {department.id === 'support' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Avg First Response</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">12.4 Mins</div>
                    <div className="text-[10px] text-cyan-500 mt-1">Target: &lt; 15 mins</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">SLA Compliance Rate</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">96.8%</div>
                    <div className="text-[10px] text-slate-400 mt-1">Live countdown enforcement</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Customer CSAT</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">4.85 / 5.0</div>
                    <div className="text-[10px] text-amber-400 mt-1">340 Client ratings</div>
                  </div>
                </div>
              )}

              {department.id === 'marketing' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Offer Turnaround Time</div>
                    <div className="text-2xl font-black text-rose-400 mt-1">&lt; 5 Mins</div>
                    <div className="text-[10px] text-rose-400 mt-1">Down from 2 days</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Proposal Acceptance Rate</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">64.5%</div>
                    <div className="text-[10px] text-emerald-400 mt-1">+18.2% Lift</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Campaign ROI</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">340%</div>
                    <div className="text-[10px] text-amber-400 mt-1">Attributed CRM revenue</div>
                  </div>
                </div>
              )}

              {department.id === 'executive' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Monthly Recurring (MRR)</div>
                    <div className="text-xl font-black text-amber-400 mt-1">$312,000</div>
                    <div className="text-[10px] text-emerald-400 mt-1">+7.6% Above Target</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">System Availability</div>
                    <div className="text-xl font-black text-emerald-400 mt-1">99.98%</div>
                    <div className="text-[10px] text-emerald-400 mt-1">0 Critical outages</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Payment Gateways</div>
                    <div className="text-xl font-black text-cyan-400 mt-1">3 Active</div>
                    <div className="text-[10px] text-cyan-400 mt-1">Stripe, PayPal, Paymob</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-xs text-slate-400">Security Policies</div>
                    <div className="text-xl font-black text-purple-400 mt-1">100% Audited</div>
                    <div className="text-[10px] text-purple-400 mt-1">RBAC + JWT Enforced</div>
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
    </div>
  );
}
