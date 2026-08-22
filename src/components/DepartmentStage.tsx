import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Pin,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Users
} from 'lucide-react';
import type { DepartmentConfig } from '../config/presentation.config';
import { FLOORS_CONFIG } from '../config/presentation.config';
import { SimulatedERPScreen } from './SimulatedERPScreen';
import { soundFX } from '../utils/sound';

interface DepartmentStageProps {
  department: DepartmentConfig;
  onBackToBuilding: () => void;
  onOpenLiveErpModal: () => void;
  onTriggerWholeOrg: () => void;
  onNextDepartment?: () => void;
  onPrevDepartment?: () => void;
}

export function DepartmentStage({
  department,
  onBackToBuilding,
  onOpenLiveErpModal,
  onTriggerWholeOrg,
  onNextDepartment,
  onPrevDepartment
}: DepartmentStageProps) {
  // View mode: 'pinboard' (presentation slide with sticky notes & screenshot) | 'office' (3D room view) | 'screen' (expanded screenshot)
  const [viewMode, setViewMode] = useState<'office' | 'pinboard' | 'screen'>('pinboard');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentFloorIdx = FLOORS_CONFIG.findIndex(f => f.floorNumber === department.floor);
  const nextFloor = FLOORS_CONFIG[currentFloorIdx + 1] || null;
  const prevFloor = FLOORS_CONFIG[currentFloorIdx - 1] || null;

  const handleZoomToPinboard = () => {
    soundFX.playTransition();
    setViewMode('pinboard');
  };

  const handleStepBackToOffice = () => {
    soundFX.playTransition();
    setViewMode('office');
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* High-Fidelity Photorealistic Office Environment Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          key={department.id + viewMode}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={department.realisticRoomImage}
          alt={`${department.name} Office Environment`}
          className="w-full h-full object-cover"
          style={{
            filter: viewMode === 'office'
              ? 'brightness(0.78) contrast(1.15) saturate(1.2)'
              : 'brightness(0.4) contrast(1.15) saturate(1.05)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/25" />
      </div>

      {/* Main Content Viewport */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        {/* Top Action Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundFX.playClick();
                if (viewMode !== 'office') {
                  handleStepBackToOffice();
                } else {
                  onBackToBuilding();
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{viewMode !== 'office' ? 'Step Back to Office Room' : 'Elevator Directory'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>CORE 360 HQ</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-amber-400 font-bold">FLOOR 0{department.floor} OF 6</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold">{department.name.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === 'office' ? (
              <button
                onClick={handleZoomToPinboard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Pin className="w-4 h-4" />
                <span>Zoom In to Wall Pinboard</span>
              </button>
            ) : (
              <button
                onClick={handleStepBackToOffice}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
                <span>View Office Room</span>
              </button>
            )}

            {department.floor === 6 ? (
              <button
                onClick={() => {
                  soundFX.playClimax();
                  onTriggerWholeOrg();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Next: Whole Organization → Thanks</span>
              </button>
            ) : onNextDepartment ? (
              <button
                onClick={() => {
                  soundFX.playTransition();
                  onNextDepartment();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Next Floor: Floor 0{nextFloor?.floorNumber || department.floor + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenLiveErpModal();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>OPEN LIVE ERP</span>
            </button>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 1: OFFICE ROOM WITH WORKING EMPLOYEES & WALL PINBOARD
            ═══════════════════════════════════════════════════════════════════ */}
        {viewMode === 'office' && (
          <main className="flex-1 flex flex-col items-center justify-between px-6 sm:px-12 py-8 max-w-5xl mx-auto w-full text-center">
            {/* Header Description */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Floor 0{department.floor} · {department.name} Office Suite</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                {department.hero.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                You are currently inside the <strong className="text-amber-400">{department.name}</strong> office. Staff are actively working on operations. Click on the wall pinboard to inspect live department metrics and system screenshots.
              </p>
            </div>

            {/* Clickable Wall Pinboard Hotspot Card */}
            <motion.div
              onClick={handleZoomToPinboard}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.3)] hover:border-amber-400 cursor-pointer max-w-xl w-full backdrop-blur-xl group transition-all my-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Pin className="w-6 h-6 rotate-45" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase">Office Wall Fixture</div>
                    <div className="text-lg font-black text-white">INTERACTIVE DEPARTMENT PINBOARD</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-400 text-slate-950">
                  {department.features.length} MODULES PINNED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-left">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Key KPI Metric</div>
                  <div className="text-base font-black text-amber-400">{department.hero.statValue}</div>
                  <div className="text-[10px] text-slate-300 font-bold">{department.hero.statHeadline}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Screenshot View</div>
                  <div className="text-base font-black text-cyan-400">Available</div>
                  <div className="text-[10px] text-slate-300 font-bold">Interactive Hotspots</div>
                </div>
              </div>

              <div className="py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md">
                <span>Click to Zoom Into Cork Pinboard & Screenshots</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onBackToBuilding}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Elevator Directory</span>
              </button>

              <button
                onClick={handleZoomToPinboard}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Inspect Pinboard</span>
              </button>

              {nextFloor && onNextDepartment && (
                <button
                  onClick={() => {
                    soundFX.playTransition();
                    onNextDepartment();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Take Elevator to Floor 0{nextFloor.floorNumber}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </main>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 2: REAL CORK PINBOARD (ZOOMED IN CLOSE-UP)
            ═══════════════════════════════════════════════════════════════════ */}
        {viewMode === 'pinboard' && (
          <div className="px-8 pt-4 pb-20 max-w-7xl mx-auto w-full flex-1">
            {/* Header and Back Button */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleStepBackToOffice}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white text-xs font-bold cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
                <span>Step Back to View Office Room & Employees</span>
              </button>

              <div className="flex items-center gap-2">
                {prevFloor && onPrevDepartment && (
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onPrevDepartment();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Floor 0{prevFloor.floorNumber}</span>
                  </button>
                )}
                {nextFloor && onNextDepartment && (
                  <button
                    onClick={() => {
                      soundFX.playTransition();
                      onNextDepartment();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black hover:bg-amber-400 flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <span>Floor 0{nextFloor.floorNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* THE CORKBOARD SURFACE & WOODEN FRAME */}
            <div className="corkboard-surface corkboard-frame relative rounded-3xl p-6 sm:p-8 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#543317]/60 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-600 border-2 border-white shadow-md flex items-center justify-center text-white pushpin-shadow">
                    <Pin className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest">
                    {department.hero.title || `OFFICE WALL PINBOARD · FLOOR 0${department.floor} · ${department.name}`}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-300/80 hidden sm:block">
                  CLICK ANY PINNED MEMO, STICKY NOTE, OR SCREENSHOT
                </span>
              </div>

              {/* PINNED CARDS GRID ON CORKBOARD */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                {/* Left Column: Pinned Sticky Notes & Features */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Card 1: Department Overview Memo Post-it */}
                  <div className="sticky-note relative p-5 rounded-2xl bg-[#fef08a] text-slate-950 shadow-2xl transform -rotate-1 hover:rotate-0 transition-all">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-600 border-2 border-white pushpin-shadow flex items-center justify-center text-white">
                      <Pin className="w-3 h-3" />
                    </div>
                    <div className="text-[10px] uppercase font-mono font-black text-amber-900 tracking-wider mb-1">
                      📌 {department.hero.statHeadline}
                    </div>
                    <h3 className="text-xl font-black text-slate-950 mb-1.5">
                      {department.hero.statHeadline}
                    </h3>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      "{department.hero.overview}"
                    </p>
                    {department.hero.badge && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-900/10 border border-amber-900/20 text-xs font-black text-amber-950">
                        {department.hero.badge}
                      </div>
                    )}
                  </div>

                  {/* Card 2: Colorful KPI Sticky Notes */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {department.kpis.map((kpi, idx) => {
                      const isFifthInFive = department.kpis.length === 5 && idx === 4;
                      const noteBg = idx === 0 
                        ? 'bg-[#cffafe] text-slate-950 rotate-1' 
                        : idx === 1 
                        ? 'bg-[#dcfce7] text-slate-950 -rotate-1' 
                        : idx === 2 
                        ? 'bg-[#fce7f3] text-slate-950 rotate-1.5' 
                        : idx === 3
                        ? 'bg-[#ffedd5] text-slate-950 -rotate-1'
                        : 'bg-[#ede9fe] text-slate-950 rotate-0.5';
                      const pinColor = idx === 0 ? 'bg-cyan-600' : idx === 1 ? 'bg-emerald-600' : idx === 2 ? 'bg-pink-600' : idx === 3 ? 'bg-amber-600' : 'bg-purple-600';

                      return (
                        <div
                          key={kpi.id}
                          className={`sticky-note relative p-4 rounded-2xl ${noteBg} ${isFifthInFive ? 'col-span-2' : ''}`}
                        >
                          <div className={`absolute -top-2.5 right-4 w-5 h-5 rounded-full ${pinColor} border-2 border-white pushpin-shadow flex items-center justify-center text-white`}>
                            <Pin className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[10px] font-mono font-black text-slate-800 uppercase mb-0.5">
                            {kpi.label}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-950 leading-snug mt-1">
                            "{kpi.subtext}"
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card 3: Pinned Feature Index Card */}
                  <div className="sticky-note relative p-5 rounded-2xl bg-[#0f172a]/95 text-white border border-slate-700 shadow-2xl">
                    <div className="absolute -top-2.5 left-6 w-5 h-5 rounded-full bg-amber-500 border-2 border-white pushpin-shadow flex items-center justify-center text-slate-950">
                      <Pin className="w-2.5 h-2.5" />
                    </div>
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          {`${department.name.toUpperCase()} FEATURES`}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {department.features.length} MODULES
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {department.features.map((feat) => (
                        <div
                          key={feat.id}
                          className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-slate-200 truncate">{feat.title}</span>
                          {feat.metric && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 font-mono font-bold shrink-0 ml-2">
                              {feat.metric}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: PINNED POLAROID / SCREENSHOT FRAME */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div
                    onClick={() => {
                      soundFX.playClick();
                      setViewMode('screen');
                    }}
                    className="sticky-note relative p-4 rounded-3xl bg-white text-slate-950 shadow-2xl rotate-1 hover:rotate-0 transition-transform cursor-pointer group"
                  >
                    {/* Pushpin at top center */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-600 border-2 border-white pushpin-shadow flex items-center justify-center text-white z-20">
                      <Pin className="w-3 h-3" />
                    </div>

                    {/* Frame Header */}
                    <div className="flex items-center justify-between px-2 pt-2 pb-2 text-xs font-black text-slate-800">
                      <span>📸 {department.showcase?.mockTitle || `${department.name} Live View`}</span>
                      <Maximize2 className="w-4 h-4 text-amber-600 group-hover:scale-125 transition-transform" />
                    </div>

                    {/* Screen Snapshot Preview */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 h-64 flex items-center justify-center">
                      <SimulatedERPScreen
                        department={department}
                        activeHotspotId={activeHotspotId}
                        onSelectHotspot={(id) => setActiveHotspotId(id)}
                      />
                    </div>

                    <div className="p-2.5 text-center text-[11px] font-mono text-slate-700 font-bold">
                      {department.showcase?.mockTitle || '🔍 Click anywhere on this frame to expand full screenshot & hotspots'}
                    </div>
                  </div>

                  {/* Briefing Highlights Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 mt-4 shadow-xl">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {`${department.name} Summary`}
                    </div>
                    <div className="space-y-2 text-xs text-slate-300">
                      {department.talkingPoints.map((tp, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            VIEW 3: EXPANDED FULL SCREENSHOT VIEW
            ═══════════════════════════════════════════════════════════════════ */}
        {viewMode === 'screen' && (
          <div className="px-8 pt-4 pb-20 max-w-7xl mx-auto w-full flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Full Interactive Screenshot View. Click circular hotspots to inspect live workflows.
              </span>
              <button
                onClick={() => setViewMode('pinboard')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Department Pinboard</span>
              </button>
            </div>

            <SimulatedERPScreen
              department={department}
              activeHotspotId={activeHotspotId}
              onSelectHotspot={(id) => {
                soundFX.playClick();
                setActiveHotspotId(id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
